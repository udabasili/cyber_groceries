import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { checkIfAdmin } from '@/middleware/checkIfAdmin';
import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import Orders from '@/models/Orders';
import dbConnect from '@/utils/dbConnect';
import errorController, { CustomError, IError } from '@/utils/errorController';

type Data = {
	success: boolean;
	message?: unknown;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const {
		method,
		body,
		query: { id },
	} = req;

	await dbConnect();
	await confirmCurrentUser(req, res);
	await checkIfAdmin(req);

	switch (method) {
		case 'GET': {
			try {
				const order = await Orders.findById(new mongoose.Types.ObjectId(id as string));
				return res.status(200).json({
					success: false,
					message: {
						order,
					},
				});
			} catch (error) {
				const errorObject = error as IError;
				const custom = new CustomError(errorObject.message);
				custom.status = errorObject.status || 500;
				custom.name = errorObject.name || 'Error';
				return errorController(custom, req, res);
			}
		}
		case 'PATCH':
			try {
				const query = { _id: new mongoose.Types.ObjectId(id as string) };
				const update = {
					$: {
						...body,
					},
				};
				const order = await Orders.findByIdAndUpdate(query, update, {
					new: true,
				});
				return res.status(200).json({ success: true, message: order });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'DELETE': {
			try {
				const order = await Orders.findById(new mongoose.Types.ObjectId(id as string));
				if (!order) {
					return res.status(400).json({ success: false });
				}
				await order.deleteOne();
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
