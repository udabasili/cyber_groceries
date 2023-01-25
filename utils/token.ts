import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'next/config';
import { Logger } from 'react-query';

import Token from '@/models/Token';

import { refreshSecretKey, secretKey } from '../config';

export interface IError extends Error {
	status?: number;
	code?: number | string;
}

export const generateToken = (userId: string) => {
	const u = {
		id: userId,
	};

	const refreshToken = jwt.sign(u, refreshSecretKey as string, {
		expiresIn: '7d', //7 days
	});
	const accessToken = jwt.sign(u, secretKey as string, {
		expiresIn: '2h', //2 hour
	});

	return { accessToken, refreshToken };
};

export const generateAccessToken = (userId: string) => {
	const u = {
		userId,
	};

	const accessToken = jwt.sign(u, secretKey as string, {
		expiresIn: '2h',
	});

	return accessToken;
};

export const reIssueAccessToken = async function (refToken: string) {
	const customError: IError = {} as IError;

	try {
		jwt.verify(refToken, refreshSecretKey as string) as JwtPayload;
		const refreshTokenFound = await Token.find({
			where: {
				refreshToken: refToken,
			},
			limit: 1,
			order: [['createdAt', 'DESC']],
		});
		const newestRefreshToken = refreshTokenFound[0]?.toJSON().refreshToken;
		const userId = refreshTokenFound[0]?.toJSON().userId;
		if (!newestRefreshToken) {
			customError.message = 'Unauthorized';
			customError.status = 401;
			return;
		}

		if (newestRefreshToken !== refToken) {
			customError.message = 'Unauthorized';
			customError.status = 401;
		}
		const { accessToken, refreshToken } = generateToken(userId);
		return { accessToken, refreshToken };
	} catch (error) {
		throw customError;
	}
};
