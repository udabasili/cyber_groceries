/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

import { Header2 } from '@/components/Elements/Headings';
import { CustomHead } from '@/components/Head';
import { useCreateOrder } from '@/features/admin';
import { Context } from '@/store/appContext';

export default function Success() {
	const { clearCart, currentUser, cart } = useContext(Context);
	const { createOrderFn } = useCreateOrder();

	useEffect(() => {
		if (sessionStorage.getItem('prevPath') && sessionStorage.getItem('prevPath')?.includes('/checkout')) {
			const reformatCart = cart.map((item) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.name,
					},
					unit_amount: item.price * 100,
				},
				quantity: item.quantity,
			}));
			createOrderFn({
				data: {
					email: currentUser.email,
					name: currentUser.name,
					items: reformatCart,
					paymentMade: true,
				},
			});
			clearCart();
		}
	}, []);

	return (
		<>
			<CustomHead title={'Successful Payment'} />
			<div
				title={'Home'}
				className="
    			flex
				items-center
				justify-center
				w-screen
				h-screen
				bg-gradient-to-r
				from-primaryLight
				to-primary
			"
			>
				<div className="px-40 py-20 bg-white rounded-md shadow-xl">
					<div className="flex flex-col items-center">
						<AiFillCheckCircle size="3rem" color="rgb(49 196 141)" />
						<Header2 className="mb-2 md:text-3xl">
							<span className="text-green-400">Payment successful</span>
						</Header2>

						<p className="mb-8 text-center text-gray-500 md:text-lg">Payment completed successfully</p>

						<Link href="/" passHref legacyBehavior>
							<p className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 cursor-pointer">
								{' '}
								Go home
							</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
