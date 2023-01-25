import React from 'react';

import { ProductCard } from '@/components/ProductCard';

import { ProductProps } from '../types';

export const ProductList = ({ currentItems }: { currentItems: Array<ProductProps> }) => {
	return (
		<>
			{currentItems &&
				currentItems.map((item) => (
					<ProductCard
						key={item.title}
						imageUrl={`/images/${item.filename}`}
						name={item.title}
						category={item.type}
						price={item.price}
						rating={item.rating}
					/>
				))}
		</>
	);
};
