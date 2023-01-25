import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const ContactMain = styled.main`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-column: center-start / center-end;
	padding: 2rem 0;
	gap: 1rem 1.5rem;

	${responsive.tabPort} {
		grid-template-columns: min-content 1fr;
		grid-column: full-start / full-end;
		grid-template-rows: unset;
		padding: 2rem 0.6rem;
		gap: unset;
	}
`;

/** SECTIONS */
const Section = styled.section`
	padding: 5rem 0;
	margin: 5rem 0;
	display: grid;
	grid-column: 1 / -1;
`;

/** COLUMN */

export const Col = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: min-content 1fr;
	gap: 1rem 2rem;

	.paragraph {
		display: flex;
		flex-direction: column;

		span:first-child {
			padding-bottom: 2px;
		}
	}
`;

/** Row */
export const Row = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem 2rem;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
`;

/** Contact List */
export const ContactListSection = styled(Section)``;

/** ContactMap */

export const ContactMapContainer = styled.div`
	grid-column: 1 / 2;
	grid-row: 2 / 3;
	height: 50vh;

	${responsive.tabPort} {
		grid-column: 1 / -1;
		grid-row: unset;
	}
`;

/** Contact Form  */

export const ContactFormContainer = styled.div`
	grid-column: 2 / 3;
	grid-row: 2 / 3;
	background-color: bisque;
	height: 100%;

	${responsive.tabPort} {
		grid-column: 1 / -1;
		grid-row: unset;
	}
`;
