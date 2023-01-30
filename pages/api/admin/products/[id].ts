import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductProps } from '@/features/shop';
import { checkIfAdmin } from '@/middleware/checkIfAdmin';
import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import Products from '@/models/Products';
import dbConnect from '@/utils/dbConnect';
import errorController, { CustomError, IError } from '@/utils/errorController';
import { paginate } from '@/utils/pagination';

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
				const product = await Products.findById(new mongoose.Types.ObjectId(id as string));
				return res.status(200).json({
					success: false,
					message: {
						product,
					},
				});
			} catch (error) {
				const errorObject = error as IError;
				const custom = new CustomError(errorObject.message);
				custom.status = errorObject.status || 500;
				console.log(errorObject.name);
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
				const product = await Products.findByIdAndUpdate(query, update, {
					new: true,
				});
				return res.status(200).json({ success: true, message: product });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'DELETE': {
			try {
				await confirmCurrentUser(req, res);
				await checkIfAdmin(req);
				const product = await Products.findById(id);
				if (!product) {
					return res.status(400).json({ success: false });
				}
				await product.deleteOne();
				res.status(200).json({ success: true, message: 'product' });
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
