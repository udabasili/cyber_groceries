import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

export type UpdateCustomerDTO = {
	data: {
		_id: string;
		name: string;
		email: string;
		role: 'User' | 'Admin';
	};
	id?: string;
};
export const updateCustomer = async ({ data, id }: UpdateCustomerDTO) => {
	const response = await apiCall.patch(`/admin/customers/${id}`, data);
	return response.data;
};

type UpdateCustomer = {
	id?: string;
	nextFn: () => void;
};
export const useUpdateCustomer = ({ id, nextFn }: UpdateCustomer) => {
	const queryClient = useQueryClient();
	const {
		mutate: updateCustomerFn,
		isLoading,
		isSuccess,
	} = useMutation({
		mutationFn: ({ data }: UpdateCustomerDTO) => updateCustomer({ data, id }),
		onSuccess: () => {
			queryClient.invalidateQueries(['customers']);
			toast.success('Customer updated');
			nextFn();
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		updateCustomerFn,
		isLoading,
		isSuccess,
	};
};
