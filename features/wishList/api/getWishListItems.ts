import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IWishListResponse } from '../types';

const getWishListFn = async () => {
	const response = await apiCall.get<IWishListResponse>(`/wishlist`);
	return response.data;
};

export const useGetWishListItems = () => {
	const { isLoading, data: wishList } = useQuery({
		queryFn: () => getWishListFn(),
		queryKey: ['wish'],
		select: (data) => data.message,
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		isLoading,
		wishList,
	};
};
