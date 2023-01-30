import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';

import { NavLink } from './index.styled';
import { RouteAdmin } from './navigationData';

type NonCollapsableNavItemProps = {
	icon: React.ReactElement;
	name: string & RouteAdmin;
	changeRoute: (e: RouteAdmin) => void;
	currentRoute: RouteAdmin;
};

export const NavItem = ({ icon, name, changeRoute, currentRoute }: NonCollapsableNavItemProps) => {
	return (
		<NavLink
			className={clsx([
				'relative list-none flex items-center justify-center text-[#8b9aaf] py-4 hover:text-white',
				currentRoute === name ? 'active' : '',
			])}
			id="sidenavSecEx2"
			onClick={() => changeRoute(name)}
		>
			<span className="text-sm tabPort:text-lg">{icon}</span>
			<span className="mx-2 font-extrabold capitalize text-lg link">{name ? name : 'Dashboard'}</span>
			{/* <div
				className={clsx([
					' font-extrabold capitalize text-lg flex flex-1  py-4 px-6 h-12  items-center text-gray-200 ',
					router.pathname === link ? 'active' : '',
				])}
			>
				<span className="text-sm tabPort:text-lg">{icon}</span>
				<span className="mx-2 font-extrabold capitalize text-lg link">{name ? name : 'Dashboard'}</span>
			</div> */}
		</NavLink>
	);
};
