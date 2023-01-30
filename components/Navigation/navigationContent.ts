/* eslint-disable no-unused-vars */
import { AiFillHome, AiFillShop, AiFillPhone } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { RiAdminFill } from 'react-icons/ri';

export type NavProps = {
	name: string;
	href: string;
	icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};
