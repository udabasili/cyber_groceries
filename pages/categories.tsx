import React from 'react';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';
import { CategoryList, CategoriesMain } from '@/features/categories';

export default function Categories() {
	return (
		<MainLayout title={'Categories'}>
			<CustomPageHeader title="Categories" path="categories" link="categories" />
			<CategoriesMain>
				<CategoryList />
			</CategoriesMain>
		</MainLayout>
	);
}
