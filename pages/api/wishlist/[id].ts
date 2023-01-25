import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import WishList from '@/models/WishList';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();
	const {
		method,
		query: { id },
	} = req;

	switch (method) {
		case 'DELETE':
			try {
				await confirmCurrentUser(req, res);
				const wishlist = await WishList.findById(id);
				if (!wishlist) {
					return res.status(400).json({ success: false });
				}
				await wishlist.remove();
				res.status(200).json({ success: true, message: wishlist });
			} catch (error) {
				errorController(error, req, res);
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
