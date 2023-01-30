import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { AiFillCloseCircle, AiFillHome, AiFillPhone, AiFillShop, AiOutlineLogout } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { RiAdminFill } from 'react-icons/ri';

import { useLogout } from '@/lib/auth';
import { ROLES, useAuthorization } from '@/lib/authorization';
import { Context } from '@/store/appContext';

import { Cart } from '../Cart';
import { Button } from '../Elements/Button';
import { Drawer } from '../Elements/Drawer';

import {
	AppLogo,
	MainNavigationContainer,
	Nav,
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavLink,
} from './index.styled';
import { MobileNav } from './MobileNavigationButton';
import { NavProps } from './navigationContent';

type NavigationProps = {
	closeMobileNavigation: () => void;
};

type CartFooterProps = {
	close: () => void;
};
export const CartFooter = ({ close }: CartFooterProps) => {
	return (
		<div className="flex flex-1 justify-between">
			<Link href="/checkout">
				<Button size="sm" variant="primary" type="submit">
					Checkout
				</Button>
			</Link>
			<Button size="sm" variant="danger" type="submit" onClick={close} data-cy="close-cart-button">
				Close
			</Button>
		</div>
	);
};

const Navigation = ({ closeMobileNavigation }: NavigationProps) => {
	const router = useRouter();
	const { checkAccess } = useAuthorization();

	const navData = [
		{
			name: 'home',
			href: '/',
			icon: AiFillHome,
		},
		checkAccess({ allowedRoles: ROLES.Admin }) && {
			name: 'admin',
			href: '/admin',
			icon: RiAdminFill,
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
	].filter(Boolean) as NavProps[];

	return (
		<Nav className="navigation-nav">
			<AiFillCloseCircle className="close-button" onClick={closeMobileNavigation} />
			{navData.map((navInfo) => (
				<Link href={navInfo.href} passHref legacyBehavior key={navInfo.name}>
					<NavLink className={router.pathname === navInfo.href ? 'active' : ''} data-cy={navInfo.name}>
						<navInfo.icon />
						{navInfo.name}
					</NavLink>
				</Link>
			))}
		</Nav>
	);
};

export const MainNavigation = () => {
	const currentRef = useRef<HTMLInputElement>(null);
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [openCartModal, setOpenCartModal] = useState(false);
	const { cart, isAuthenticated } = useContext(Context);
	const { logoutUser } = useLogout();

	function closeMobileNavigation() {
		if (currentRef.current) {
			currentRef.current.checked = false;
		}
	}

	return (
		<MainNavigationContainer>
			<div className="navigation-top row">
				<AppLogo>
					<Image src="/organic food.svg" alt="organic food logo" width={40} height={40} />
					<span>Cyber Groceries</span>
				</AppLogo>
				<NavigationMenu className="navigation-menu">
					<NavigationMenuItem onClick={() => setOpenSearchModal(true)} role="button">
						<FaSearch />
						<span>Search</span>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink passHref href={'/profile'}>
							<FaUserAlt />
							<span>My Account</span>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenu>
				{isAuthenticated ? (
					<AiOutlineLogout
						size="2rem"
						className="navigation-language cursor-pointer"
						color="var(--primary)"
						onClick={() => logoutUser()}
					>
						Logout
					</AiOutlineLogout>
				) : null}
			</div>
			<div className="navigation-bottom row">
				<MobileNav ref={currentRef} />
				<div className="nav-background" />
				<Navigation closeMobileNavigation={closeMobileNavigation} />
				<button
					title="Shopping Cart"
					onClick={() => setOpenCartModal(true)}
					data-cy="cart-button"
					className=" relative text-white mr-4 bg-primary hover:bg-neutral-400 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
				>
					{cart?.length > 0 && (
						<span
							className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"
							data-cy="cart-count"
						>
							{cart.length.toString()}
						</span>
					)}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
					<span className="sr-only">Shopping Cart</span>
				</button>
				<Link href="/wishlist">
					<button
						title="Wishlist"
						className="text-white bg-red-400 hover:bg-neutral-400  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
							/>
						</svg>

						<span className="sr-only">Wish list</span>
					</button>
				</Link>
			</div>
			<Drawer
				isOpen={openCartModal}
				close={() => setOpenCartModal(false)}
				title={'Cart'}
				renderFooter={<CartFooter close={() => setOpenCartModal(false)} />}
			>
				<Cart />
			</Drawer>
		</MainNavigationContainer>
	);
};
