import { getCookie, setCookie } from 'cookies-next';
import { JwtPayload, verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { secretKey } from '@/config/index';
import { AuthUser } from '@/features/auth';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';
import { reIssueAccessToken } from '@/utils/token';

interface CustomNextApiRequest extends NextApiRequest {
	currentUser: AuthUser;
	userId: string;
}

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
	await dbConnect();

	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const refreshToken = getCookie('X-Refresh-Token', { req, res }) || '';
				if (!refreshToken) {
					throw new Error('UnAuthorized');
				}
				const tokens = await reIssueAccessToken(refreshToken?.toString());

				setCookie('X-Refresh-Token', tokens?.refreshToken, {
					req,
					res,
					maxAge: 60 * 60 * 24 * 7,
					httpOnly: true,
					sameSite: 'strict',
				});
				setCookie('logged_in', 'Current User Dats', { req, res, maxAge: 60 * 60 * 24 * 7 });
				return res.status(201).json({ message: { jwt: tokens?.accessToken }, success: true });
			} catch (error) {
				errorController(error, req, res);
			}
			break;
		default:
			return res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	}
};

export default handler;
