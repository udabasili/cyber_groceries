import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	grid-template-columns:
		[full-start] minmax(6rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 8.75rem) [col-end])
		[center-end] minmax(6rem, 1fr) [full-end];
	font-weight: normal;
	font-size: 0.9rem;
	line-height: 1.5;
`;

export const Main = styled.main`
	display: grid;
	grid-template-columns: inherit;
	grid-column: full-start / full-end;
	padding-top: 10rem;
	background-color: var(--background);
`;
