import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IOrderResponse, IStripeFormat } from '../types';

export type CreateOrderDTO = {
	data: {
		email: string;
		name: string;
		items: Array<IStripeFormat>;
		paymentMade: boolean;
	};
};
export const createOrder = async ({ data }: CreateOrderDTO) => {
	const response = await apiCall.post<IOrderResponse>('/admin/orders', data);
	return response.data;
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	const {
		mutate: createOrderFn,
		isLoading,
		isSuccess,
	} = useMutation({
		mutationFn: ({ data }: CreateOrderDTO) => createOrder({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries(['orders']);
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		createOrderFn,
		isLoading,
		isSuccess,
	};
};
