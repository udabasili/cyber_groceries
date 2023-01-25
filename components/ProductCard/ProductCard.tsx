import { nanoid } from 'nanoid';
import Image from 'next/image';
import React, { useContext } from 'react';
import { BsCart, BsHeartFill } from 'react-icons/bs';
import { IoMdOpen } from 'react-icons/io';
import { toast } from 'react-toastify';

import { Context } from '@/store/appContext';
import { CartItem } from '@/types/cart';

import { Button } from '../Elements/Button';
import { Header3 } from '../Elements/Headings';

import { ProductCardContainer, ProductCardImage } from './index.styled';

type ProductCardProps = {
	imageUrl: string;
	name: string;
	category: string;
	price: number;
	sale?: boolean;
	discount?: boolean;
	rating: number;
	saleVale?: number;
};

export const ProductCard = (props: ProductCardProps) => {
	const { imageUrl, name, category, price, sale, discount, saleVale, rating } = props;
	const { addItemToCart } = useContext(Context);

	function addToCart(item: CartItem) {
		addItemToCart(item);
		toast.success('Item Added to cart');
	}

	return (
		<ProductCardContainer>
			<ProductCardImage>
				<Image src={imageUrl} alt={name} fill />
			</ProductCardImage>
			{sale ? (
				<div className="sales" title="Sales">
					<span>Sale !</span>
				</div>
			) : null}
			{discount ? (
				<div className="discount" title="Discount">
					<span>{saleVale}% Off</span>
				</div>
			) : null}

			<div className="icons">
				<div className="icon" title="Add to Wishlist">
					<BsHeartFill color="red" />
				</div>
				<div className="icon" title="View Product">
					<IoMdOpen />
				</div>
			</div>
			<div className="product-card__content">
				<span className="product-card__category">{category}</span>
				<Header3 className="product-card__name">{name}</Header3>
				<div className="flex items-center">
					{[...new Array(5)].map((_, index) => (
						<svg
							aria-hidden="true"
							key={index}
							className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300 '} `}
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>First star</title>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					))}
				</div>

				<div className="product-card__footer">
					<span className="product-card__price">${price}</span>
					<Button
						variant="dark"
						type="button"
						size="sm"
						className="product-card__button"
						startIcon={<BsCart />}
						onClick={() =>
							addToCart({
								id: nanoid(),
								imageUrl,
								name,
								quantity: 1,
								category,
								price,
							})
						}
					>
						Add
					</Button>
				</div>
			</div>
		</ProductCardContainer>
	);
};
