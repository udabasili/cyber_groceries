import argon2 from 'argon2';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import { RegisterDataDTO } from '@/features/auth';
import Token from '@/models/Token';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';
import { generateToken } from '@/utils/token';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	}
	await dbConnect();

	try {
		const userInputDTO = req.body as RegisterDataDTO;

		const hash = await argon2.hash(userInputDTO.password);
		Reflect.deleteProperty(userInputDTO, 'password');
		Reflect.deleteProperty(userInputDTO, 'confirmPassword');

		const userRecord = await User.create({
			...userInputDTO,
			password: hash,
		});

		const user = userRecord.toJSON();
		const token = await generateToken(user._id);

		await Token.create({
			userId: user._id,
			refreshToken: token.refreshToken,
		});
		Reflect.deleteProperty(user, 'hashedPassword');
		Reflect.deleteProperty(user, 'email');
		setCookie('X-Refresh-Token', token.refreshToken, {
			req,
			res,
			maxAge: 60 * 60 * 24 * 7,
			httpOnly: true,
			sameSite: 'strict',
		}); //7days
		setCookie('logged_in', 'Current User Dats', { req, res, maxAge: 60 * 60 * 24 * 7 }); //7days
		return res.status(201).json({ message: { user, jwt: token.accessToken }, success: true });
	} catch (error) {
		errorController(error, req, res);
	}
}

export default handler;
