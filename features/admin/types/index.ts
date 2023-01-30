import { BaseEntity } from '@/types/index';

export type IStripeFormat = {
	price_data: {
		currency: string;
		product_data: {
			name: string;
		};
		unit_amount: number;
	};
	quantity: number;
};

export type ICustomer = {
	_id: string;
	name: string;
	email: string;
	password: string;
	role: 'User' | 'Admin';
} & BaseEntity;

export type ICustomerResponse = {
	message: {
		customer: ICustomer;
	};
	success: boolean;
};

export type ICustomersResponse = {
	message: {
		customers: ICustomer[];
	};
	success: boolean;
};

export type IOrder = {
	email: string;
	name: string;
	items: Array<IStripeFormat>;
	paymentMade: boolean;
} & BaseEntity;

export type IOrderResponse = {
	message: {
		order: IOrder;
	};
	success: boolean;
};

export type IOrdersResponse = {
	message: {
		orders: IOrder[];
	};
	success: boolean;
};
