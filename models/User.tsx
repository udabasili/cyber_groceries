import mongoose from 'mongoose';
import { string } from 'yup';

import { AuthUser } from '@/features/auth';

function validateEmail(email: string) {
	const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
}

const userSchema = new mongoose.Schema<AuthUser>(
	{
		name: {
			required: true,
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Email address is required'],
			validate: [validateEmail, 'Please fill a valid email address'],
			match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
		},
		password: {
			required: true,
			type: String,
			min: 8,
		},
		role: {
			required: true,
			type: String,
			default: 'User',
			enum: ['User', 'Admin'],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model('User', userSchema);
