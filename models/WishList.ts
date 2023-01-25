import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

import { IWishList } from '@/features/wishList';

const wishlistSchema = new mongoose.Schema<IWishList>(
	{
		user: {
			type: ObjectId,
			required: true,
			ref: 'User',
		},
		productName: {
			type: String,
			required: true,
		},
		productImage: {
			type: String,
			required: true,
		},
		productPrice: {
			type: Number,
			required: true,
		},
		productCategory: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
