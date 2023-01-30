import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ICustomerResponse } from '../types';

const getCustomer = async (customerId?: string) => {
	const url = `/admin/customers/${customerId}`;
	const response = await apiCall.get<ICustomerResponse>(url);
	return response.data;
};

type GetCustomerProps = {
	customerId?: string;
};

export const useGetCustomer = ({ customerId }: GetCustomerProps) => {
	const {
		isLoading,
		error,
		data: customer,
	} = useQuery({
		queryKey: ['customer', customerId],
		queryFn: () => getCustomer(customerId),
		enabled: Boolean(customerId),
		select: (data) => {
			return data.message.customer;
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		isLoading,
		customer,
		error,
	};
};
