import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/Elements/Button';
import { Header2 } from '@/components/Elements/Headings';
import { categoryWithRemovedBackground } from '@/data/removeBackgound';

import { CategoriesCard, CategoriesCards, CategoriesSection } from './index.styled';

export const Categories = () => {
	return (
		<CategoriesSection data-cy="categories-section">
			<div className="u-margin-bottom-medium u-center-text col-span-3" data-cy="categories">
				<Header2 className="mb-2">Categories</Header2>
				<p className="text-lg">See our catalog</p>
			</div>
			<CategoriesCards>
				{categoryWithRemovedBackground.map((category) => (
					<CategoriesCard
						key={category.name}
						className="card"
						image={category.imageUrl}
						color={category.color}
					>
						<div className="background" />
						<div className="card__content">
							<h4 className="card__heading">{category.name}</h4>
							<Link href={`/categories/${category.name.toLowerCase().split(' ').join('-')}`}>
								<Button
									size="md"
									variant="dark"
									type="button"
									data-cy={`${category.name}--view-button`}
								>
									View
								</Button>
							</Link>
						</div>
					</CategoriesCard>
				))}
			</CategoriesCards>
		</CategoriesSection>
	);
};
