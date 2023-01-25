import { AiFillHome, AiFillShop, AiFillPhone } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosInformationCircleOutline } from 'react-icons/io';

type NavProps = {
	name: string;
	href: string;
	icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const navData = [
	{
		name: 'home',
		href: '/',
		icon: AiFillHome,
	},
	{
		name: 'products',
		href: '/products',
		icon: AiFillShop,
	},
	{
		name: 'categories',
		href: '/categories',
		icon: BiCategoryAlt,
	},
	{
		name: 'about',
		href: '/about',
		icon: IoIosInformationCircleOutline,
	},
	{
		name: 'contact',
		href: '/contact',
		icon: AiFillPhone,
	},
] as NavProps[];
