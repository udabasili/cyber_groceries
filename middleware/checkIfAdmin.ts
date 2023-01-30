import { NextApiRequest } from 'next';

import { CustomError } from '@/utils/errorController';

export const checkIfAdmin = async (req: NextApiRequest) => {
	const userRecord = req.currentUser;

	if (!userRecord) {
		const error = new CustomError('UnAuthorized');
		error.status = 401;
		throw error;
	}

	if (userRecord.role !== 'Admin') {
		const error = new CustomError('UnAuthorized');
		error.status = 401;
		throw error;
	}

	return;
};
