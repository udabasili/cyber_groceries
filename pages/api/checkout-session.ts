import { NextApiRequest, NextApiResponse } from 'next';

import { stripeKey } from '@/config/index';
import errorController from '@/utils/errorController';

const stripe = require('stripe')(stripeKey);

const redirectURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cyber-groceries.vercel.app/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case 'POST': {
			try {
				const { cart } = req.body;
				const session = await stripe.checkout.sessions.create({
					payment_method_types: ['card'],
					line_items: [...cart],
					mode: 'payment',
					success_url: `${req.headers.origin}/success`,
					cancel_url: `${req.headers.origin}/checkout`,
				});
				return res.status(200).json({ id: session.id });
			} catch (error) {
				errorController(error, req, res);
			}
			break;
		}

		default:
			return res.status(404).json({
				success: false,
				message: 'Method not allowed',
			});
	}
}
