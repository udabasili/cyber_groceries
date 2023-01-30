import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ICustomersResponse } from '../types';

const removeCustomerFn = async (customerId: string) => {
	const response = await apiCall.delete<ICustomersResponse>(`/admin/customers/${customerId}`);
	return response.data;
};

export const useRemoveCustomers = (nextFn: () => void) => {
	const queryClient = useQueryClient();

	const {
		isLoading,
		mutate: removeCustomer,
		isSuccess,
	} = useMutation({
		mutationFn: (customerId: string) => removeCustomerFn(customerId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['customers'] });
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
		removeCustomer,
		isSuccess,
	} as const;
};
