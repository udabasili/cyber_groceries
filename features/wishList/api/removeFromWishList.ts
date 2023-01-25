import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IWishListResponse } from '../types';

const removeFromWishListFn = async (wishListItemId: string) => {
	const response = await apiCall.delete<IWishListResponse>(`/wishlist/${wishListItemId}`);
	return response.data;
};

export const useRemoveFromWisList = (nextFn: () => void) => {
	const queryClient = useQueryClient();

	const { isLoading, mutate: removeFromWishList } = useMutation({
		mutationFn: (wishListItemId: string) => removeFromWishListFn(wishListItemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wish'] });
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
		removeFromWishList,
	} as const;
};
