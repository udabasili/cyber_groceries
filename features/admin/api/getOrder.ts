import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IOrderResponse } from '../types';

const getOrder = async (orderId?: string) => {
	const url = `/admin/orders/${orderId}`;
	const response = await apiCall.get<IOrderResponse>(url);
	return response.data;
};

type GetOrderProps = {
	orderId?: string;
};

export const useGetOrder = ({ orderId }: GetOrderProps) => {
	const {
		isLoading,
		error,
		data: order,
	} = useQuery({
		queryKey: ['order', orderId],
		queryFn: () => getOrder(orderId),
		enabled: Boolean(orderId),
		select: (data) => {
			return data.message.order;
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		isLoading,
		order,
		error,
	};
};
