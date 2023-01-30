import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

export type CreateProductDTO = {
	data: {
		name: string;
		imageUrl: string;
		rating: number;
		price: number;
		description: string;
		category: string;
	};
};
export const createProduct = async ({ data }: CreateProductDTO) => {
	const response = await apiCall.post('/admin/products', data);
	return response.data;
};

export const useCreateProduct = (nextFn: () => void) => {
	const queryClient = useQueryClient();
	const {
		mutate: createProductFn,
		isLoading,
		isSuccess,
	} = useMutation({
		mutationFn: ({ data }: CreateProductDTO) => createProduct({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries(['admin-products']);
			toast.success('Product added');
			nextFn();
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		createProductFn,
		isLoading,
		isSuccess,
	};
};
