import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IOrdersResponse } from '../types';

const getAllOrders = async () => {
	const url = `/admin/orders`;
	const response = await apiCall.get<IOrdersResponse>(url);
	return response.data;
};

export const useGetAllOrders = () => {
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ['orders'],
		queryFn: () => getAllOrders(),
		keepPreviousData: true,
		select: (data) => {
			return data.message.orders;
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		isLoading,
		orders: data || [],
		error,
		isFetching,
	};
};
