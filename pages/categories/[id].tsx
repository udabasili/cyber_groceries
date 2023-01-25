import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { Spinner } from '@/components/Elements/Spinner';
import { MainLayout, ContentLayout } from '@/components/Layout';
import { CategoryProducts, CategoryTabs, useGetProductsByCategory } from '@/features/categories';

export default function CategoryDetails() {
	const router = useRouter();
	const { id } = router.query;
	const [page, setPage] = useState<number>(0);

	const { isLoading, hasMore, products, pager, isPreviousData, isFetching } = useGetProductsByCategory({
		categoryId: id as string,
		page,
	});

	if (isLoading) {
		return (
			<MainLayout title={`${id ? id : 'Categories'}`}>
				<div className="flex loader items-center justify-center text-gray-500 tabPort:col-span-full col-[full-start/full-end] self-start">
					<Spinner size="lg" containerClassName="self-center justify-self-center my-10" />;
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout title={`${id ? id : 'Categories'}`}>
			<CategoryTabs />
			{isFetching && (
				<div className="flex loader items-center justify-center text-gray-500 tabPort:col-span-full col-[full-start/full-end] self-start">
					<Spinner size="lg" containerClassName="self-center justify-self-center my-10" />;
				</div>
			)}
			<CategoryProducts
				products={products}
				hasMore={hasMore}
				pager={pager}
				isPreviousData={isPreviousData}
				setPage={setPage}
				page={page}
			/>
		</MainLayout>
	);
}
