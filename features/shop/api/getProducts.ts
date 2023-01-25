import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';

import { category } from '@/data/categories';
import { apiCall } from '@/lib/axios';

import { FilterProps, IProductsResponse } from '../types';

const getProducts = async (page: number, filter?: FilterProps) => {
	let url = `/products?page=${page + 1}`;
	if (filter) {
		if (filter.categories?.length) {
			const obj = {
				category: filter.categories.toString(),
			};
			url = url + '&' + new URLSearchParams(obj).toString();
		}
		if (filter.prices) {
			const obj = {
				min: filter.prices[0].toString(),
				max: filter.prices[1].toString(),
			};
			url = url + '&' + new URLSearchParams(obj).toString();
		}
	}
	const response = await apiCall.get<IProductsResponse>(url);
	return response.data;
};

type Props = {
	filter?: FilterProps;
	page?: number;
};

export const useGetProducts = ({ filter, page = 1 }: Props) => {
	const { isLoading, error, data, isFetching, isPreviousData } = useQuery({
		queryKey: ['projects', page, filter],
		queryFn: () => getProducts(page, filter),
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
