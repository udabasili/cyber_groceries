import { AuthUser } from '@/features/auth';
import { ProductProps } from '@/features/shop';

export type IWishList = {
	_id: string;
	user: Partial<AuthUser>;
	productName: string;
	productImage: string;
	productPrice: number;
	productCategory: string;
};

export type IWishListRequest = {
	productName: string;
	productImage: string;
	productPrice: number;
	productCategory: string;
};

export type IWishListResponse = {
	message: IWishList[];
	success: boolean;
};
