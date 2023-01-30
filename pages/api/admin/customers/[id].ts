import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { checkIfAdmin } from '@/middleware/checkIfAdmin';
import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import User from '@/models/User';
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
				const customer = await User.findById(new mongoose.Types.ObjectId(id as string));
				return res.status(200).json({
					success: false,
					message: {
						customer,
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
				await confirmCurrentUser(req, res);
				await checkIfAdmin(req);
				const query = { _id: new mongoose.Types.ObjectId(id as string) };
				const update = {
					$set: {
						...body,
					},
				};
				const customer = await User.findByIdAndUpdate(query, update, {
					new: true,
				});
				return res.status(200).json({ success: true, message: customer });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'DELETE': {
			try {
				await confirmCurrentUser(req, res);
				await checkIfAdmin(req);
				const customer = await User.findById(id);
				if (!customer) {
					return res.status(400).json({ success: false });
				}
				await customer.deleteOne();
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
