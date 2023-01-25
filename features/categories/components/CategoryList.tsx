import React from 'react';

import { categoryWithRemovedBackground } from '@/data/removeBackgound';
import { CategoriesCards } from '@/features/home';

import { CategoryItem } from './CategoryItem';
import { CategoriesSection } from './index.styled';

export const CategoryList = () => {
	return (
		<CategoriesSection>
			<CategoriesCards>
				{categoryWithRemovedBackground.map((category) => (
					<CategoryItem
						key={category.name}
						name={category.name}
						imageUrl={category.imageUrl}
						color={category.color}
					/>
				))}
			</CategoriesCards>
		</CategoriesSection>
	);
};
