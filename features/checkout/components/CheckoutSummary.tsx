import Image from 'next/image';
import React, { useContext, useMemo } from 'react';

import { Header3 } from '@/components/Elements/Headings';
import { Header4Container } from '@/components/Elements/Headings/index.style';
import { Context } from '@/store/appContext';
import { CartItem } from '@/types/cart';

import { CheckOutItemContainer, Container } from './index.styled';

const CheckOutItem = (props: CartItem) => {
	const { name, imageUrl, price, quantity, category } = props;
	return (
		<CheckOutItemContainer>
			<div className="image">
				<Image src={imageUrl} alt={name} fill />
			</div>
			<Header4Container className="name">{name}</Header4Container>
			<span className="price">${price}</span>
			<span className="category">{category}</span>
			<span className="quantity u-margin-bottom-small">Quantities: {quantity}</span>
			<button
				type="button"
				className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium text-sm p-2.5 text-center inline-flex items-center mr-2 self-start justify-self-start rounded-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="white"
					className="w-5 h-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>

				<span className="sr-only">Icon description</span>
			</button>
		</CheckOutItemContainer>
	);
};

export const CheckoutSummary = () => {
	const { cart } = useContext(Context);

	const total = useMemo(() => {
		if (cart?.length) {
			return cart.reduce((accum, currentItem) => accum + Number(currentItem.price), 0);
		}
	}, [cart]);
	return (
		<Container className="summary py-5 px-8 w-[70%] justify-self-center">
			<Header3 className="u-margin-bottom-small">Cart Summary</Header3>
			<div className="flex items-center space-x-2 border-t my-5 border-gray-200 rounded-b dark:border-gray-600">
				<ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400 flex flex-1 flex-col">
					<li className="flex justify-between text-md my-2">
						<span className="font-semibold">Sub Total</span>
						<span>${total}</span>
					</li>
					<li className="flex justify-between text-md">
						<span className="font-semibold">Shipping</span>
						<span>0</span>
					</li>
				</ul>
			</div>
			<div className="flex items-center border-t border-gray-200 rounded-b dark:border-gray-600"></div>
			<div className="flex justify-between text-md my-2">
				<span className="font-semibold">Total</span>
				<span className=" leading-tight text-2xl mb-5 text-black font-bold">${total}</span>
			</div>
			<div className="grid gap-5 mt-10 ">
				{cart.map((cartItem) => (
					<CheckOutItem
						key={cartItem.id}
						id={cartItem.id}
						name={cartItem.name}
						category={cartItem.category}
						imageUrl={cartItem.imageUrl}
						price={cartItem.price}
						quantity={cartItem.quantity}
					/>
				))}
			</div>
		</Container>
	);
};
