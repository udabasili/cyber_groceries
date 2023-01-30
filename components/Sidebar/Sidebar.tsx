/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';

import { SidebarContainer } from './index.styled';
import { navData, RouteAdmin } from './navigationData';
import { NavItem } from './NavItem';

type SideNavProps = {
	changeRoute: (e: RouteAdmin) => void;
	currentRoute: RouteAdmin;
};
export const SideNav = ({ changeRoute, currentRoute }: SideNavProps) => {
	return (
		<SidebarContainer className={clsx(['w-60 h-full shadow-md ', 'open'])}>
			{navData.map((item) => {
				return (
					<NavItem
						key={item.name}
						icon={<item.icon />}
						name={item.name as RouteAdmin}
						changeRoute={changeRoute}
						currentRoute={currentRoute}
					/>
				);
			})}
		</SidebarContainer>
	);
};
