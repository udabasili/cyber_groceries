import { deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();

	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				await confirmCurrentUser(req, res);

				deleteCookie('X-Refresh-Token', {
					req,
					res,
				});
				deleteCookie('logged_in', { req, res });

				return res.status(201).json({ message: 'logged out', success: true });
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
