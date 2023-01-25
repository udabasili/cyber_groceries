import { category } from '@/data/categories';
import { products } from '@/data/products';

const filter = {
	prices: [20, 50] as [number, number],
	categories: [] as Array<typeof category[number]>,
};

export type ProductProps = typeof products[0];

export type IProductsResponse = {
	message: {
		products: ProductProps[];
		hasMore: boolean;
		pager: {
			startIndex: number;
			endIndex: number;
			total: number;
		};
	};
	status: number;
	success: boolean;
};

export type FilterProps = typeof filter;
export type CategoryProps = typeof category[number];
