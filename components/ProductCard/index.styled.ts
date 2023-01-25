import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const ProductCardContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr min-content;
	overflow: hidden;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
	border-radius: 20px;
	position: relative;
	background-color: white;
	grid-auto-rows: min-content;
	position: relative;
	max-height: 60vh;

	.product-card {
		&__content {
			display: flex;
			flex-direction: column;
			grid-column: 1 / -1;
			padding: 0 2rem 2rem;
			margin-top: 1.1rem;
		}
		&__category {
			font-size: 0.8rem;
			color: rgb(173, 173, 173);
			margin-bottom: 0.6rem;
			line-height: 1.1;
		}

		&__name {
			font-size: 1.2rem;
			font-weight: 700;
			line-height: 1;
			margin-bottom: 0.5rem;
		}

		&__footer {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 1.5rem;
			justify-content: space-between;
		}
		&__price {
			color: darkgreen;
			font-weight: bolder;
		}

		&__button {
			color: white;
			background-color: var(--secondary);
			font-size: 0.8rem;
			justify-self: center;
		}
	}

	.icons {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		height: 15vh;
		grid-row: 1 / 2;
		grid-column: 1 / -1;

		${responsive.tabPort} {
			grid-template-rows: 1fr;
			padding: 0;
			grid-template-columns: 1fr max-content;
			width: 100%;
			background-color: transparent;
		}
		.icon {
			align-self: flex-end;
			width: 2.4rem;
			height: 2.4rem;
			border: 1px solid var(--primary);
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			background-color: white;

			&:hover {
				background-color: var(--primary-light);
			}

			svg {
				font-size: 1rem;
			}
		}
	}

	.discount,
	.sales {
		width: 60px;
		height: 40px;
		color: white;
		background-color: red;
		grid-column: 1 / 2;
		grid-row: 1 / 2;
		justify-self: flex-start;
		z-index: 4;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		border-radius: 0 9px 9px 0;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
	}

	.sales {
		border-radius: 9px 0 0 9px;
		grid-column: 2 / 3;
		justify-self: flex-end;
		background-color: gold;
		color: black;
	}
`;

export const ProductCardImage = styled.div`
	position: relative;
	width: 100%;
	grid-row: 1 / 2;
	grid-column: 1 / -1;
	z-index: 1;
	height: 30vh;

	img {
		object-fit: cover;
	}
`;
