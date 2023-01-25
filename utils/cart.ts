import { CartItem } from '@/types/cart';

export const addItemToCart = (cartItem: CartItem, cartItems: Array<CartItem>): CartItem[] => {
	const copyCartItems = [...cartItems];
	const foundCartItem = copyCartItems.find((item) => item.name === cartItem.name);

	if (foundCartItem) {
		return copyCartItems.map((item) =>
			item.name === cartItem.name ? { ...item, quantity: item.quantity + 1 } : item
		);
	}

	return [
		...cartItems,
		{
			...cartItem,
			quantity: 1,
		},
	];
};

export const removeItemFromCart = (cartItemId: string, cartItems: Array<CartItem>): CartItem[] => {
	const copyCartItems = [...cartItems];
	const foundCartItem = copyCartItems.find((item) => item.id === cartItemId);
	if (foundCartItem?.quantity === 1) {
		return copyCartItems.filter((item) => item.id !== cartItemId);
	}

	return copyCartItems.map((item) => (cartItemId === item.id ? { ...item, quantity: item?.quantity - 1 } : item));
};

export const clearItemFromCart = function (itemId: string, cartItems: Array<CartItem>): CartItem[] {
	const updatedCartItems = [...cartItems];

	return updatedCartItems.filter((cartItem) => cartItem.id !== itemId);
};
