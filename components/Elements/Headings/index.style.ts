import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const SectionHeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	grid-column: 1 / -1;

	.content {
		display: grid;
		grid-template-columns: 1fr max-content 1fr;
		align-items: center;
		justify-content: center;
		align-self: center;
		width: 50%;

		${responsive.tabPort} {
			display: none;
		}

		&::before,
		&::after {
			content: '';
			height: 6px;
			display: block;
			background-color: var(--primary);
		}
	}
`;

/** CustomPageHeader */

export const CustomHeader = styled.header`
	grid-column: full-start / full-end;
	width: 100%;
	position: relative;
	background-color: #fff;

	.content {
		width: 100%;
		height: 100%;
		padding: 8vh 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		color: var(--primary-dark);
	}

	.title {
		display: block;
		font-size: 6rem;
		text-align: center;
		text-transform: uppercase;
		font-family: var(--header);

		${responsive.tabPort} {
			font-size: 3.1rem;
		}
	}

	.list {
		display: flex;
		list-style: none;
		color: black;
		font-size: 1.2rem;
		font-family: var(--paragraph);
		color: var(--primary);

		${responsive.tabPort} {
			font-size: 1rem;
		}
	}

	.item {
		&:not(:last-child) {
			&::after {
				content: '/';
				margin-right: 1rem;
				margin-left: 1rem;
			}
		}
	}

	.link {
		&,
		&:link {
			text-decoration: none;
		}

		&:hover,
		&:active {
			color: var(--primary-dark);
		}

		&.active {
			text-decoration: underline;
		}
	}
`;

/** HEADINGS */

export const Header1Container = styled.h1`
	font-size: 4.5rem;
	color: var(--secondary);
	line-height: 1;
	font-family: var(--header);
	font-weight: bold;

	${responsive.tabPort} {
		font-size: 3.5rem;
	}
`;

export const Header2Container = styled.h2`
	font-size: 3.5rem;
	color: var(--primary);
	line-height: 1;
	font-family: var(--header);
	font-weight: 700;

	${responsive.tabPort} {
		font-size: 2.5rem;
	}
`;

export const Header3Container = styled.h3`
	color: var(--primary);
	line-height: 1;
	font-family: var(--header);
	font-weight: bold;
	font-size: 1.8rem;
	text-transform: uppercase;
	font-weight: 400;

	${responsive.tabPort} {
		font-size: 1.6rem;
	}
`;

export const Header4Container = styled.h4`
	font-size: 1.2rem;
	color: var(--secondary);
	font-family: var(--header);
	font-weight: 400;

	${responsive.tabPort} {
		font-size: 1rem;
	}
`;
