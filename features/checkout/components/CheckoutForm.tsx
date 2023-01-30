/* eslint-disable jsx-a11y/label-has-associated-control */
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/Elements/Button';
import { Header4 } from '@/components/Elements/Headings';
import { publicStrip } from '@/config/index';
import { apiCall } from '@/lib/axios';
import { Context } from '@/store/appContext';

import { Container } from './index.styled';

export const CheckoutForm = () => {
	const stripePromise = loadStripe(publicStrip);
	const { cart } = useContext(Context);

	const handleCheckout = async () => {
		try {
			const stripe = await stripePromise;
			const reformatCart = cart.map((item) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.name,
					},
					unit_amount: Math.trunc(item.price * 100),
				},
				quantity: item.quantity,
			}));
			const checkoutSession = await apiCall.post('/checkout-session', { cart: reformatCart });
			if (stripe) {
				const result = await stripe.redirectToCheckout({
					sessionId: checkoutSession.data.id,
				});

				if (result.error) {
					toast.error(result.error.message);
					return;
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container className="form flex flex-col items-start mx-5">
			<Button variant="primary" type="button" size="md" onClick={handleCheckout} className="my-6">
				Checkout
			</Button>
			<Header4 className="">Use the relevant data below to fill the form in the next page</Header4>
			<p className="mb-5">
				This is a test payment. so right click and save the image below or open in new tab then click the{' '}
				<em>checkout button</em> above. Then use it to fill the data in the next page
			</p>
			<Image src="/test-card.jpg" height={300} width={300} alt="Test Card" className="" />
		</Container>
	);
};
