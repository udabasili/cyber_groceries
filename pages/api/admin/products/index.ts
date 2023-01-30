import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductProps } from '@/features/shop';
import { checkIfAdmin } from '@/middleware/checkIfAdmin';
import { confirmCurrentUser } from '@/middleware/setCurrentUser';
import Products from '@/models/Products';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';
import { paginate } from '@/utils/pagination';

type Data = {
	success: boolean;
	message: unknown;
};

const ITEMS_PER_PAGE = 9;

interface QueryObject extends NextApiRequest {
	query: {
		page: string;
	};
}

export default async function handler(req: QueryObject, res: NextApiResponse<Data>) {
	const { method, query } = req;

	await dbConnect();
	await confirmCurrentUser(req, res);
	await checkIfAdmin(req);

	switch (method) {
		case 'GET': {
			try {
				const { page } = query;
				const products = await Products.find({});
				const filteredProducts = products;
				const currentPage = Number(page);
				const pager = paginate({
					currentPage,
					totalItems: filteredProducts.length,
					pageSize: ITEMS_PER_PAGE,
				});
				const currentItems = filteredProducts.slice(pager.startIndex, pager.endIndex + 1);

				return res.status(200).json({
					success: false,
					message: {
						products: currentItems,
						hasMore: pager.currentPage !== pager.endPage,
						pager: {
							startIndex: pager.startIndex,
							endIndex: pager.endIndex,
							total: pager.totalItems,
						},
					},
				});
			} catch (error) {
				return errorController(error, req, res);
			}
		}
		case 'POST': {
			try {
				await dbConnect();
				const productBody = req.body as ProductProps;
				await Products.create({
					...productBody,
				});
				res.status(200).json({ success: true, message: 'product' });
			} catch (error) {
				return errorController(error, req, res);
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
