import argon2 from 'argon2';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import { LoginCredentialsDTO } from '@/features/auth';
import Token from '@/models/Token';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';
import { generateToken } from '@/utils/token';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await dbConnect();

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
					throw new Error('User not registered');
				}

				const verifiedPassword = await argon2.verify(
					userRecord.toJSON().password.trim(),
					loginInput.password.toString()
				);
				if (!verifiedPassword) {
					throw new Error("Email / Password don't match");
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
				errorController(error, req, res);
			}
			break;
		default:
			return res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	}
};

export default handler;
