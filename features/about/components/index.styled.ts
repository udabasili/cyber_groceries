import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const AboutMain = styled.main`
	display: grid;
	grid-template-columns: inherit;
	grid-column: full-start / full-end;
	padding: 2rem 0;
	position: relative;
	gap: 1rem 1.5rem;

	${responsive.tabPort} {
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
`;

/** MISSION */

export const MissionImage = styled.div`
	height: 40vh;
	grid-column: col-start 1 / col-end 8;
	position: relative;
	margin: 3rem 0;

	img {
		object-fit: cover;
		object-position: center;
	}

	${responsive.tabPort} {
		grid-column: 1 / -1;
		margin: 1rem 2rem;
	}
`;

export const MissionContent = styled.div`
	display: grid;
	gap: 6rem;
	grid-column: center-start / center-end;
	grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));

	${responsive.tabPort} {
		gap: 2rem;
		grid-column: 1 / -1;
		padding: 1rem;
	}
`;

/** Values */

export const ValuesSection = styled(Section)`
	.header {
		padding: 2rem;
	}
`;

export const ValuesContent = styled(MissionContent)`
	padding: 2rem;
`;

/**Reviews */

export const ReviewsSection = styled(Section)`
	grid-column: center-start / center-end;

	${responsive.tabPort} {
		grid-column: 1 / -1;
	}
`;

export const ReviewsList = styled(Carousel)`
	grid-column: 1 / -1;
	margin: 0;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	background-color: white;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem 0;

	${responsive.tabPort} {
		width: 100vw;
		margin: 0;
	}
`;
export const ReviewCard = styled.div`
	min-height: 50vh;
	width: 100%;
	font-size: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	justify-self: center;
	position: relative;

	.paragraph {
		font-size: 1.4rem;
		padding: 0 1.4rem;
		font-style: italic;
		font-weight: 100;
	}

	.avatar {
		grid-column: 1 / -1;
		justify-self: center;
	}
`;

/** SPONSORS */

export const SponsorsSection = styled(Section)`
	grid-column: center-start / center-end;
`;

export const SponsorLogos = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 3rem;
	justify-items: center;
	align-items: center;
	height: 10vh;

	${responsive.tabPort} {
		padding: 1rem;
	}
`;

export const SponsorLogo = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	position: relative;
	max-height: 2.5rem;
	max-width: 100%;

	img {
		filter: brightness(70%);
	}
`;
