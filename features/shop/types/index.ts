import { category } from '@/data/categories';

const filter = {
	prices: [20, 50] as [number, number],
	categories: [] as Array<typeof category[number]>,
};

export type ProductProps = {
	_id: string;
	name: string;
	imageUrl: string;
	rating: number;
	price: number;
	description: string;
	category: string;
};

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

export type IProductResponse = {
	message: {
		product: ProductProps;
	};
	status: number;
	success: boolean;
};

export type FilterProps = typeof filter;
export type CategoryProps = typeof category[number];
