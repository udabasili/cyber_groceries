import ReactSlider from 'react-slider';
import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const ShopMain = styled.main`
	display: grid;
	grid-template-columns: inherit;
	grid-column: center-start / center-end;
	grid-template-rows: min-content 1fr;

	padding: 2rem 0;
	gap: 1rem 1.5rem;

	${responsive.tabPort} {
		grid-template-columns: min-content 1fr;
		grid-template-rows: min-content 1fr;
		grid-column: full-start / full-end;
		padding: 2rem 0.6rem;
		gap: 1rem;
	}
`;

/** Filter Component */

export const FilterContainer = styled.aside`
	grid-column: full-start / col-end 2;
	grid-row: 1 / 3;
	background-color: #ffffff;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

	.filter-button {
		display: none;
	}

	.non-mobile {
		display: flex;

		${responsive.tabPort} {
			display: none;
		}
	}

	${responsive.tabPort} {
		grid-column: 1 / 2;
		grid-row: 1;
		background-color: red;

		.filter-button {
			display: flex;
		}
	}
`;

export const FilterContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 3rem 2rem;

	.filter {
		display: flex;
		flex-direction: column;
		margin-bottom: 3rem;
	}

	.filter {
		&__header {
			font-size: 1.2rem;
			margin-bottom: 2rem;
		}
	}
`;

export const Slider = styled(ReactSlider)`
	&.slider {
		margin: auto;
		width: 100%;
		height: 30px;
	}

	.slider-track {
		top: 8px;
		height: 7px;
		background: lightgrey;
	}

	.slider-track.slider-track-0 {
		background: lightgrey;
	}

	.slider-track.slider-track-1 {
		background: var(--secondary);
	}

	.slider-thumb {
		cursor: pointer;
		background: var(--secondary);
		width: 20px;
		height: 20px;
		border-radius: 100%;
		/* remove default outline when selected */
		outline: none;
	}

	.slide-mark {
		cursor: pointer;
		top: 6px;
		width: 1.5px;
		height: 8px;
		background-color: #aaaaaa;
	}

	.slider-thumb:hover {
		box-shadow: 0 0 0 8px var(--secondary-hover);
	}
`;
/** Products Component */

export const ProductListSection = styled.section`
	grid-column: col-start 3 / full-end;
	grid-row: 2 / 3;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	gap: 1rem 1.5rem;
	min-height: 100vh;

	&.loader {
		display: flex;
	}

	${responsive.tabPort} {
		grid-column: 1 / -1;
	}
`;

export const Pagination = styled.div`
	grid-column: 1 / -1;
`;

/** Sort Component */

export const SortContainer = styled.div`
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	height: 10vh;
	background-color: #ffffff;
	grid-column: col-start 3 / full-end;
	grid-row: 1 / 2;

	${responsive.tabPort} {
		grid-column: 2 / 3;
		grid-row: 1;
		height: auto;
	}
`;
