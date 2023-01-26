import argon2 from 'argon2';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import { LoginCredentialsDTO } from '@/features/auth';
import Token from '@/models/Token';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import errorController, { CustomError, IError } from '@/utils/errorController';
import { generateToken } from '@/utils/token';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();

	const { method } = req;

	switch (method) {
		case 'POST':
			try {
				const loginInput = req.body as LoginCredentialsDTO;
				const userRecord = await User.findOne({
					where: {
						email: loginInput.email,
					},
				});

				if (userRecord === null) {
					const error = new CustomError('User not registered');
					error.status = 401;
					throw error;
				}

				const verifiedPassword = await argon2.verify(
					userRecord.toJSON().password.trim(),
					loginInput.password.toString()
				);
				if (!verifiedPassword) {
					const error = new CustomError("Email / Password don't match");
					error.status = 401;
					throw error;
				}

				const user = userRecord.toJSON();

				const token = await generateToken(user._id);
				await Token.create({
					userId: user._id,
					refreshToken: token.refreshToken,
				});
				Reflect.deleteProperty(user, 'password');
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
				const errorObject = error as any;
				errorController(errorObject, req, res);
			}
			break;
		default:
			return res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	}
};

export default handler;
