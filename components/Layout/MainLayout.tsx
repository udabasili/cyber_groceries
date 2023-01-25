import React from 'react';

import { Footer } from '../Footer';
import { CustomHead } from '../Head';
import { MainNavigation } from '../Navigation';

import { Container, Main } from './index.styled';

type MainLayoutProps = {
	children: React.ReactNode;
	title: string;
};

export const MainLayout = ({ children, title }: MainLayoutProps) => {
	return (
		<>
			<CustomHead title={title} />
			<Container>
				<MainNavigation />
				<Main className="relative focus:outline-none">{children}</Main>
				<Footer />
			</Container>
		</>
	);
};
