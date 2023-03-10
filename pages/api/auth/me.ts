import { NextApiRequest, NextApiResponse } from 'next';

import { AuthUser } from '@/features/auth';
import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

interface CustomNextApiRequest extends NextApiRequest {
	currentUser: AuthUser;
	userId: string;
}
async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	}

	await dbConnect();
	await confirmCurrentUser(req, res);

	try {
		return res.status(201).json({ message: { user: req.currentUser, jwt: 'token' }, success: true });
	} catch (error) {
		const errorObject = error as any;
		errorController(errorObject, req, res);
	}
}

export default handler;
