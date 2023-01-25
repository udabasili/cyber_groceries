import clsx from 'clsx';
import React from 'react';

import { Header4 } from './Headings';
import { Header2Container, SectionHeaderContainer } from './index.style';

type SectionHeaderProps = {
	title: string;
	subText?: string;
	className?: string;
};

export const SectionHeader = ({ title, subText, className = '' }: SectionHeaderProps) => {
	return (
		<SectionHeaderContainer className={clsx(['u-center-text u-margin-bottom-medium', className])}>
			<Header2Container className=" u-margin-bottom-small">{title}</Header2Container>
			{subText ? <Header4>{subText}</Header4> : null}
		</SectionHeaderContainer>
	);
};
