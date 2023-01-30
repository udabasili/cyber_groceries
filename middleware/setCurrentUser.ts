import { JwtPayload, verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import User from '@/models/User';
import errorController, { CustomError } from '@/utils/errorController';

import { secretKey } from '../config';

export const confirmCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers } = req;

	const accessToken = headers.authorization?.split(' ')[1] as string;
	const decode: JwtPayload = (await verify(accessToken, secretKey)) as JwtPayload;

	if (!decode.id) {
		const error = new CustomError('UnAuthorized');
		error.status = 401;
		throw error;
	}
	const userRecord = await User.findOne({
		where: {
			userId: decode.id,
		},
	});
	if (!userRecord) {
		const error = new CustomError('UnAuthorized');
		error.status = 401;
		throw error;
	}
	const currentUser = userRecord.toJSON();
	Reflect.deleteProperty(currentUser, 'password');

	req.currentUser = currentUser;
	return;
};
