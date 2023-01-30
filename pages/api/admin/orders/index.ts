import type { NextApiRequest, NextApiResponse } from 'next';

import { checkIfAdmin } from '@/middleware/checkIfAdmin';
import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import Orders from '@/models/Orders';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

type Data = {
	success: boolean;
	message: unknown;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { method } = req;

	await dbConnect();
	await confirmCurrentUser(req, res);

	switch (method) {
		case 'GET': {
			try {
				await checkIfAdmin(req);
				const orders = await Orders.find({});
				return res.status(200).json({
					success: false,
					message: {
						orders,
					},
				});
			} catch (error) {
				return errorController(error, req, res);
			}
		}
		case 'POST': {
			try {
				await dbConnect();
				await Orders.create({
					...req.body,
				});
				res.status(200).json({ success: true, message: 'order' });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		}
		default:
			return res.status(404).json({
				success: false,
				message: 'Method not allowed',
			});
	}
}
