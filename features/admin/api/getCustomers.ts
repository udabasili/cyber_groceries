import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ICustomersResponse } from '../types';

const getCustomers = async () => {
	const url = `/admin/customers`;
	const response = await apiCall.get<ICustomersResponse>(url);
	return response.data;
};

export const useGetAllCustomers = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['customers'],
		queryFn: () => getCustomers(),
		select: (data) => {
			const currentData = data.message.customers;
			return currentData;
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		isLoading,
		customers: data || [],
	};
};
