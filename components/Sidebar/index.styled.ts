import Link from 'next/link';
import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const SidebarContainer = styled('aside')`
	grid-column: full-start / col-end 1;
	background-color: #1a1c23;
	width: 100%;
	padding: 2rem 3rem;
	& > .div {
		background-color: var(--primary) !important;
	}

	${responsive.tabPort} {
		width: 100%;
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		padding: 0.2rem 0.5rem;
	}
`;

export const NavLink = styled.li`
	cursor: pointer;

	&.active {
		background-color: rgb(0 0 0 / var(--tw-bg-opacity));
		color: var(--secondary);
	}

	${responsive.tabPort} {
		span.link {
			display: none;
		}
	}
`;
