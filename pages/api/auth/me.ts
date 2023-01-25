import { NextApiRequest, NextApiResponse } from 'next';

import { AuthUser } from '@/features/auth';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

import { confirmCurrentUser } from 'middleware/setCurrentUser';

interface CustomNextApiRequest extends NextApiRequest {
	currentUser: AuthUser;
	userId: string;
}
async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	}

	await dbConnect();

	try {
		await confirmCurrentUser(req, res);
		return res.status(201).json({ message: { user: req.currentUser, jwt: 'token' }, success: true });
	} catch (error) {
		errorController(error, req, res);
	}
}

export default handler;
