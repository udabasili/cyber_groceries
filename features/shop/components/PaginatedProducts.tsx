import React, { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';

import { PaginationButton } from '@/components/Elements/PaginationButton';
import { Spinner } from '@/components/Elements/Spinner';

import { useGetProducts } from '../api/getProducts';
import { FilterProps } from '../types';

import { ProductListSection } from './index.styled';
import { ProductList } from './ProductList';

type Props = {
	filter: FilterProps;
	itemsPerPage: number;
};
export const PaginatedProducts = ({ itemsPerPage, filter }: Props) => {
	const [page, setPage] = useState(0);
	const { products, pager, hasMore, isLoading, isPreviousData } = useGetProducts({ filter, page });

	if (isLoading) {
		return (
			<div className="flex loader items-center justify-center text-gray-500 tabPort:col-span-full col-[col-start_3/full-end] self-start">
				<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
			</div>
		);
	}

	if (!products?.length) {
		return (
			<ProductListSection className="flex loader items-center justify-center text-gray-500 bg-white h-screen">
				<FaUserFriends className="w-16 h-16" />
				<h4>No Products Found</h4>
			</ProductListSection>
		);
	}
	return (
		<ProductListSection>
			<PaginationButton
				isPreviousData={isPreviousData}
				hasMore={hasMore}
				page={page}
				pager={pager}
				setPage={setPage}
			/>
			<ProductList currentItems={products} />
		</ProductListSection>
	);
};
