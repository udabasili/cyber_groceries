import React from 'react';

import { CustomHead } from '../Head';

type ContentLayoutProps = {
	title: string;
	children: React.ReactNode;
};
export const ContentLayout = ({ title, children }: ContentLayoutProps) => {
	return (
		<>
			<CustomHead title={title} />
			<>{children}</>
		</>
	);
};
