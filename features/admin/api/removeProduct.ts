import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { IProductsResponse } from '@/features/shop';
import { apiCall } from '@/lib/axios';

const removeProductFn = async (productId: string) => {
	const response = await apiCall.delete<IProductsResponse>(`/admin/products/${productId}`);
	return response.data;
};

export const useRemoveProducts = (nextFn: () => void) => {
	const queryClient = useQueryClient();

	const {
		isLoading,
		mutate: removeProduct,
		isSuccess,
	} = useMutation({
		mutationFn: (productItemId: string) => removeProductFn(productItemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin-products'] });
			nextFn();
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
			nextFn();
		},
	});

	return {
		isLoading,
		removeProduct,
		isSuccess,
	} as const;
};
