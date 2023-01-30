import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const Container = styled.div`
	display: grid;
	grid-column: 1/ -1;
	grid-template-columns: inherit;
`;

export const Section = styled.section`
	grid-column: col-end 1 / full-end;
	min-height: 80vh;

	${responsive.tabPort} {
		width: unset;
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		padding: 2rem 0rem;
	}
`;

export const Header = styled.div`
	grid-column: 1 / -1;
	margin: 1rem;
	display: flex;
	background-color: #1a1c23;
	padding: 1rem 2rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 2rem;

	${responsive.tabPort} {
		gap: 1rem;
		grid-template-columns: repeat(2, 1fr);
		margin: 0;
		width: 100vw;
		padding: 1rem 0.5rem;
	}
`;
