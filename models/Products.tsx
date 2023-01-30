import mongoose from 'mongoose';

import { category } from '@/data/categories';

const productSchema = new mongoose.Schema(
	{
		name: {
			required: true,
			type: String,
			unique: true,
		},
		category: {
			type: String,
			required: true,
			enum: category,
		},
		description: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
