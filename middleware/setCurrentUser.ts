import { JwtPayload, verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import User from '@/models/User';
import errorController from '@/utils/errorController';

import { secretKey } from '../config';

export const confirmCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers } = req;

	try {
		const accessToken = headers.authorization?.split(' ')[1] as string;

		const decode: JwtPayload = (await verify(accessToken, secretKey)) as JwtPayload;

		if (!decode.id) {
			throw new Error('UnAuthorized');
		}
		const userRecord = await User.findOne({
			where: {
				userId: decode.id,
			},
		});
		if (!userRecord) {
			throw new Error('UnAuthorized');
		}
		const currentUser = userRecord.toJSON();
		Reflect.deleteProperty(currentUser, 'password');

		req.currentUser = currentUser;
		return;
	} catch (error) {
		return errorController(error, req, res);
	}
};
