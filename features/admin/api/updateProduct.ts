import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

export type UpdateProductDTO = {
	data: {
		name: string;
		imageUrl: string;
		rating: number;
		price: number;
		description: string;
		category: string;
	};
	id?: string;
};
export const updateProduct = async ({ data, id }: UpdateProductDTO) => {
	const response = await apiCall.patch(`/admin/products/${id}`, data);
	return response.data;
};

type UpdateProduct = {
	id?: string;
	nextFn: () => void;
};
export const useUpdateProduct = ({ id, nextFn }: UpdateProduct) => {
	const queryClient = useQueryClient();
	const {
		mutate: updateProductFn,
		isLoading,
		isSuccess,
	} = useMutation({
		mutationFn: ({ data }: UpdateProductDTO) => updateProduct({ data, id }),
		onSuccess: () => {
			queryClient.invalidateQueries(['admin-products']);
			toast.success('Product update');
			nextFn();
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		updateProductFn,
		isLoading,
		isSuccess,
	};
};
