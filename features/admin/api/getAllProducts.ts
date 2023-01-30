import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { IProductsResponse } from '@/features/shop';
import { apiCall } from '@/lib/axios';

const getAllProducts = async (page: number) => {
	const url = `/admin/products/?page=${page + 1}`;
	const response = await apiCall.get<IProductsResponse>(url);
	return response.data;
};

type Props = {
	page: number;
};

export const useGetAllProducts = ({ page }: Props) => {
	const { isLoading, error, data, isFetching, isPreviousData } = useQuery({
		queryKey: ['admin-products', page],
		queryFn: () => getAllProducts(page),
		keepPreviousData: true,
		select: (data) => {
			const currentData = data.message.products;
			return {
				currentData,
				...data.message,
			};
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		isLoading,
		products: data?.currentData || [],
		pager: {
			startIndex: data?.pager.startIndex,
			endIndex: data?.pager.endIndex,
			total: data?.pager.total,
		},
		error,
		isFetching,
		isPreviousData,
		hasMore: data?.hasMore || false,
	};
};
