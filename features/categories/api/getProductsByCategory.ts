import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { IProductsResponse } from '@/features/shop';
import { apiCall } from '@/lib/axios';

export const getProductsByCategory = async (categoryId: string, page: number) => {
	let url = `/products?page=${page + 1}`;
	const obj = {
		category: categoryId,
	};
	url = url + '&' + new URLSearchParams(obj).toString();
	const response = await apiCall.get<IProductsResponse>(url);
	return response.data;
};

type Props = {
	categoryId: string;
	page: number;
};

export const useGetProductsByCategory = ({ categoryId, page }: Props) => {
	const { isLoading, data, isPreviousData, isFetching } = useQuery({
		queryKey: ['products', categoryId, page],
		queryFn: () => getProductsByCategory(categoryId, page),
		select: (data) => {
			const currentData = data.message.products;
			return {
				currentData,
				...data.message,
			};
		},
		keepPreviousData: true,
		enabled: !!categoryId,
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
		hasMore: data?.hasMore || false,
		isPreviousData,
		isFetching,
	};
};
