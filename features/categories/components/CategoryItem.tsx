import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/Elements/Button';
import { CategoriesCard } from '@/features/home';

type CategoryItemProps = {
	name: string;
	imageUrl: string;
	color: string;
};

export const CategoryItem = (props: CategoryItemProps) => {
	const { name, imageUrl, color } = props;
	const url = `/categories/${name.toLowerCase().split(' ').join('-')}`;
	return (
		<CategoriesCard key={name} className="card" image={imageUrl} color={color}>
			<div className="background" />
			<div className="card__content">
				<h4 className="card__heading">{name}</h4>
				<Link href={url} legacyBehavior>
					<Button size="md" variant="dark" type="button">
						View
					</Button>
				</Link>
			</div>
		</CategoriesCard>
	);
};
