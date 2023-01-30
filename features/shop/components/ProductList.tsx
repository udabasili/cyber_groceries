import React from 'react';

import { ProductCard } from '@/components/ProductCard';

import { ProductProps } from '../types';

export const ProductList = ({ currentItems }: { currentItems: Array<ProductProps> }) => {
	return (
		<>
			{currentItems &&
				currentItems.map((item) => (
					<ProductCard
						key={item.name}
						imageUrl={item.imageUrl}
						name={item.name}
						category={item.category}
						price={item.price}
						rating={item.rating}
					/>
				))}
		</>
	);
};
