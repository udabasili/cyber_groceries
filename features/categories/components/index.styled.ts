import { Tabs } from 'flowbite-react';
import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const CategoriesMain = styled.main`
	display: grid;
	grid-template-columns: inherit;
	grid-column: center-start / center-end;
	padding: 2rem 0;
	gap: 1rem 1.5rem;
	background-color: var(--background);

	${responsive.tabPort} {
		grid-column: full-start / full-end;
		padding: 2rem 0.6rem;
		gap: unset;
	}
`;

/** SECTION */
const Section = styled.section`
	display: grid;
	padding: 3rem 1rem;
	grid-template-columns: inherit;

	${responsive.tabPort} {
		padding: 0;
	}
`;

/** Categories Section */

export const CategoriesSection = styled(Section)`
	display: grid;
	grid-column: 1 / -1;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	gap: 1rem 2rem;
`;

/** Categories Tabs */
export const CustomTabs = styled.div`
	display: flex;
	grid-column: 1 / -1;
	width: 100%;
`;

export const TabGroup = styled.ul`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(6, 1fr);
	background-color: #ffffff;
	margin-top: 0.5rem;

	${responsive.tabPort} {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const TabItem = styled.li`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1rem 0;
	cursor: pointer;

	&:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}

	.tab {
		&__name {
			font-size: 1.3rem;
			font-weight: 700;
			text-transform: capitalize;
			padding-bottom: 10px;

			${responsive.tabPort} {
				font-size: 1.1rem;
			}

			${responsive.mobile} {
				font-size: 0.8rem;
			}
		}

		&__icon {
			font-size: 1rem;

			${responsive.tabPort} {
				font-size: 1.1rem;
			}

			${responsive.mobile} {
				font-size: 0.8rem;
			}
		}
	}

	&.active {
		background-color: #f4f5f5;
	}
`;

export const CategoryProductsSection = styled.section`
	grid-column: center-start / center-end;
	grid-row: 2 / 3;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	gap: 1rem 1.5rem;
	min-height: 100vh;
	margin: 5rem 0;

	&.loader {
		display: flex;
	}

	${responsive.tabPort} {
		grid-column: 1 / -1;
		padding: 1rem;
	}
`;

export const Pagination = styled.div`
	grid-column: 1 / -1;
`;
