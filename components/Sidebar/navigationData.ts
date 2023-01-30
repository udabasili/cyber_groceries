import { AiFillHome } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaBoxes, FaShippingFast } from 'react-icons/fa';

export const navData = [
	{
		name: 'dashboard',
		icon: AiFillHome,
		collapsible: false,
	},
	{
		name: 'products',
		icon: FaBoxes,
		collapsible: false,
	},
	{
		name: 'customers',
		icon: BsPeopleFill,
		collapsible: false,
	},
	{
		name: 'orders',
		icon: FaShippingFast,
		collapsible: false,
	},
];

export const adminRoutes = ['dashboard', 'products', 'customers', 'orders'] as const;
export type RouteAdmin = typeof adminRoutes[number];
