import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductProps } from '@/features/shop';
import { checkIfAdmin } from '@/middleware/checkIfAdmin';
import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

type Data = {
	success: boolean;
	message: unknown;
};

interface QueryObject extends NextApiRequest {
	query: {
		page: string;
	};
}

export default async function handler(req: QueryObject, res: NextApiResponse<Data>) {
	const { method, query } = req;

	await dbConnect();
	await confirmCurrentUser(req, res);
	await checkIfAdmin(req);

	switch (method) {
		case 'GET': {
			try {
				const currentUserId = req.currentUser._id;
				const customers = await User.find({
					_id: {
						$ne: currentUserId,
					},
				});

				return res.status(200).json({
					success: false,
					message: {
						customers,
					},
				});
			} catch (error) {
				return errorController(error, req, res);
			}
		}
		case 'POST': {
			try {
				await dbConnect();
				const customerBody = req.body as ProductProps;
				await User.create({
					...customerBody,
				});
				res.status(200).json({ success: true, message: 'customer' });
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
