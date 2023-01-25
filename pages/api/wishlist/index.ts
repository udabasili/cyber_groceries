import { Error } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { IWishListRequest } from '@/features/wishList';
import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import User from '@/models/User';
import WishList from '@/models/WishList';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.status(501).json({ success: false, message: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse) {
		res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();
		await confirmCurrentUser(req, res);
		const wishListData = req.body as IWishListRequest;
		await WishList.create({
			user: req.currentUser._id,
			...wishListData,
		});
		res.status(200).json({ success: true });
	} catch (error) {
		return errorController(error, req, res);
	}
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();
		await confirmCurrentUser(req, res);
		const wishList = await WishList.find({ user: req.currentUser._id }).populate('user', '_id name imageUrl', User);
		return res.status(200).json({ success: true, message: wishList });
	} catch (error) {
		errorController(error, req, res);
	}
});

export default apiRoute;
