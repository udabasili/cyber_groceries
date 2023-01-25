import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IWishListRequest, IWishListResponse } from '../types';

const addToWishListFn = async (newWishListItem: IWishListRequest) => {
	const response = await apiCall.post<IWishListResponse>('/wishlist', newWishListItem);
	return response.data;
};

export const useAddToWisList = () => {
	const queryClient = useQueryClient();

	const { isLoading, mutate: addToWishList } = useMutation({
		mutationFn: (newWishListItem: IWishListRequest) => addToWishListFn(newWishListItem),
		onSuccess: () => {
			toast.success('Added to wishlist');
			queryClient.invalidateQueries({ queryKey: ['wish'] });
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		isLoading,
		addToWishList,
	} as const;
};
