import mongoose, { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		name: {
			required: true,
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		items: [
			{
				type: Schema.Types.Mixed,
			},
		],
		paymentMade: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
