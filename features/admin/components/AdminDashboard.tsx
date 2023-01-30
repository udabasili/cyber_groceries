import React from 'react';

import { SideNav } from '@/components/Sidebar';
import { RouteAdmin } from '@/components/Sidebar/navigationData';

import { Container, Section } from './index.styled';

type Props = {
	children: React.ReactNode;
	changeRoute: (e: RouteAdmin) => void;
	currentRoute: RouteAdmin;
};
export const AdminDashboard = ({ children, changeRoute, currentRoute }: Props) => {
	return (
		<Container>
			<SideNav changeRoute={changeRoute} currentRoute={currentRoute} />
			<Section>{children}</Section>
		</Container>
	);
};
