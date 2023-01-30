import Image from 'next/image';
import React, { useContext } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Context } from '@/store/appContext';

import { CartBody, CartItemContainer } from './index.style';

type CartItemProps = {
	id: string;
	image: string;
	quantity: number;
	name: string;
	price: number;
};

export const CartItem = (props: CartItemProps) => {
	const { image, quantity, price, name, id } = props;
	const { removeItemFromCart } = useContext(Context);

	return (
		<CartItemContainer>
			<div className="image-container">
				<Image src={image} alt={name} fill />
			</div>
			<span className="quantity">x {quantity}</span>
			<span className="name">{name}</span>
			<span className="price">${price}</span>
			<AiFillCloseCircle
				size="22px"
				role="button"
				onClick={() => removeItemFromCart(id)}
				data-cy="remove-button"
			/>
		</CartItemContainer>
	);
};

export const Cart = () => {
	const { cart } = useContext(Context);

	return (
		<>
			<CartBody data-cy="cart">
				{cart?.length ? (
					cart.map(({ imageUrl, quantity, name, price, id }, index) => (
						<CartItem image={imageUrl} quantity={quantity} name={name} price={price} key={index} id={id} />
					))
				) : (
					<p className="no-products">No products in the cart.</p>
				)}
			</CartBody>
		</>
	);
};
