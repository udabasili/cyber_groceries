import { nanoid } from 'nanoid';
import Image from 'next/image';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/Elements/Button';
import { Header2, Header3 } from '@/components/Elements/Headings';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { useAddToWisList } from '@/features/wishList';
import { Context } from '@/store/appContext';
import { CartItem } from '@/types/cart';

import { SampleProduct, SampleProductsContent, SampleProductsSection } from './index.styled';

export const SampleProducts = () => {
	const { addItemToCart, currentUser } = useContext(Context);
	const { addToWishList, isLoading } = useAddToWisList();

	function addToCart(item: CartItem) {
		addItemToCart(item);
		toast.success('Item Added to cart');
	}

	return (
		<SampleProductsSection>
			<div className="u-margin-bottom-medium u-center-text col-span-3">
				<Header2 className="mb-2">Sample Products</Header2>
				<p className="text-lg">Just a few of our products</p>
			</div>
			<SampleProductsContent>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 h-full">
					<SampleProduct className="sample-products">
						<Header3 className="sample-products__header mb-3">Sample {categories[0].name}</Header3>
						<ul className="flex flex-col sample-products__list">
							{products
								.filter((product, index) => product.type === categories[0].name)
								.filter((_, index) => index < 3)
								.map((product) => (
									<li className="card" key={product.filename}>
										<div className="card__side card__side--front">
											<Image
												className="card__image"
												src={`/images/${product.filename}`}
												alt={product.filename}
												width={70}
												height={70}
											/>
											<span className="card__name"> {product.title}</span>
											<span className="card__price"> ${product.price}</span>
										</div>
										<div className="card__side card__side--back">
											<Button
												variant="primary"
												type="button"
												size="md"
												onClick={() =>
													addToCart({
														id: nanoid(),
														imageUrl: `/images/${product.filename}`,
														name: product.title,
														quantity: 1,
														category: product.type,
														price: product.price,
													})
												}
											>
												Add to Cart
											</Button>
											<button
												type="button"
												onClick={() =>
													addToWishList({
														productName: product.title,
														productImage: `/images/${product.filename}`,
														productPrice: product.price,
														productCategory: product.type,
													})
												}
												title="Add to WishList"
												className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 "
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
													/>
												</svg>

												<span className="sr-only">Add to WishList</span>
											</button>
										</div>
									</li>
								))}
						</ul>
					</SampleProduct>
					<SampleProduct className="sample-products">
						{' '}
						<Header3 className="sample-products__header mb-3">Sample {categories[1].name}</Header3>
						<ul className="flex flex-col sample-products__list">
							{products
								.filter((product) => product.type === categories[1].name)
								.filter((_, index) => index < 3)
								.map((product) => (
									<li className="card" key={product.filename}>
										<div className="card__side card__side--front">
											<Image
												className="card__image"
												src={`/images/${product.filename}`}
												alt={product.filename}
												width={70}
												height={70}
											/>
											<span className="card__name"> {product.title}</span>
											<span className="card__price"> ${product.price}</span>
										</div>
										<div className="card__side card__side--back">
											<Button
												variant="primary"
												type="button"
												size="md"
												onClick={() =>
													addToCart({
														id: nanoid(),
														imageUrl: `/images/${product.filename}`,
														name: product.title,
														quantity: 1,
														category: product.type,
														price: product.price,
													})
												}
											>
												Add to Cart
											</Button>
											<button
												type="button"
												onClick={() =>
													addToWishList({
														productName: product.title,
														productImage: `/images/${product.filename}`,
														productPrice: product.price,
														productCategory: product.type,
													})
												}
												title="Add to WishList"
												className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 "
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
													/>
												</svg>

												<span className="sr-only">Add to Wishlist</span>
											</button>
										</div>
									</li>
								))}
						</ul>
					</SampleProduct>
					<SampleProduct className="sample-products">
						<Header3 className="sample-products__header mb-3">Sample {categories[3].name}</Header3>
						<ul className="flex flex-col sample-products__list">
							{products
								.filter((product) => product.type === categories[3].name)
								.filter((_, index) => index < 3)
								.map((product) => (
									<li className="card" key={product.filename}>
										<div className="card__side card__side--front">
											<Image
												className="card__image"
												src={`/images/${product.filename}`}
												alt={product.filename}
												width={70}
												height={70}
											/>
											<span className="card__name"> {product.title}</span>
											<span className="card__price"> ${product.price}</span>
										</div>
										<div className="card__side card__side--back">
											<Button
												variant="primary"
												type="button"
												size="md"
												onClick={() =>
													addToCart({
														id: nanoid(),
														imageUrl: `/images/${product.filename}`,
														name: product.title,
														quantity: 1,
														category: product.type,
														price: product.price,
													})
												}
											>
												Add to Cart
											</Button>
											<button
												type="button"
												onClick={() =>
													addToWishList({
														productName: product.title,
														productImage: `/images/${product.filename}`,
														productPrice: product.price,
														productCategory: product.type,
													})
												}
												title="Add to WishList"
												className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 "
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
													/>
												</svg>

												<span className="sr-only">Add to WishList</span>
											</button>
										</div>
									</li>
								))}
						</ul>
					</SampleProduct>
				</div>
			</SampleProductsContent>
		</SampleProductsSection>
	);
};
