import { CartItem } from '@/types/cart';

const prefix = 'cyber_groceries';

export const storage = {
	set: (token: string) => localStorage.setItem(`${prefix}_token`, token),
	get: () => localStorage.getItem(`${prefix}_token`),
	clear: () => localStorage.removeItem(`${prefix}_token`),
};

export const cartStorage = {
	set: (cart: CartItem[]) => localStorage.setItem(`cart`, JSON.stringify(cart)),
	check: () => !!localStorage.getItem(`cart`),
	clearCart: () => localStorage.removeItem('cart'),
	get: (): CartItem[] => (localStorage.getItem(`cart`) ? JSON.parse(localStorage.getItem(`cart`) as string) : []),
};
