import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductProps } from '@/features/shop';
import Products from '@/models/Products';
import dbConnect from '@/utils/dbConnect';
import { paginate } from '@/utils/pagination';

type Data = {
	success: boolean;
	message: unknown;
};

const ITEMS_PER_PAGE = 9;

interface QueryObject extends NextApiRequest {
	query: {
		page: string;
		min: string;
		max: string;
		category: string;
	};
}

export default async function handler(req: QueryObject, res: NextApiResponse<Data>) {
	const { method, query } = req;

	await dbConnect();
	switch (method) {
		case 'GET': {
			const { min, max, page, category } = query;
			const products = await Products.find({});
			let filteredProducts = products;
			const currentPage = Number(page);
			if (category) {
				const categoryArray = category.split(',');
				filteredProducts = products.filter((data) => {
					return categoryArray.includes(data.category as typeof category[number]);
				});
			}
			if (max && min) {
				filteredProducts = filteredProducts.filter(
					(data) => data.price >= Number(min) && data.price <= Number(max)
				);
			}

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
		}
		default:
			return res.status(404).json({
				success: false,
				message: 'Method not allowed',
			});
	}
}
