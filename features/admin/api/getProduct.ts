import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { IProductResponse, IProductsResponse } from '@/features/shop';
import { apiCall } from '@/lib/axios';

const getProduct = async (productId?: string) => {
	const url = `/admin/products/${productId}`;
	const response = await apiCall.get<IProductResponse>(url);
	return response.data;
};

type GetProductProps = {
	productId?: string;
};

export const useGetProduct = ({ productId }: GetProductProps) => {
	const {
		isLoading,
		error,
		data: product,
	} = useQuery({
		queryKey: ['admin-product', productId],
		queryFn: () => getProduct(productId),
		enabled: Boolean(productId),
		select: (data) => {
			return data.message.product;
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		isLoading,
		product,
		error,
	};
};
