import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const HeaderContainer = styled.header`
	display: grid;
	grid-column: full-start / full-end;
	background-color: var(--white);
`;

export const SlideShowContainer = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;

	${responsive.tabPort} {
		width: 90%;
		margin: 2rem auto;
		max-height: unset;
	}
`;

export const Slide = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: none;
	background-color: white;
	height: 90vh;

	${responsive.tabPort} {
		flex-direction: row;
		border-radius: 20px 20px 0 0;
		overflow: hidden;
	}

	&.fade {
		animation-name: fade;
		animation-duration: 1.5s;
	}

	&.active {
		display: flex;
		background-color: white;

		${responsive.tabPort} {
			display: grid;
			grid-column: 1fr;
		}
	}

	@keyframes fade {
		from {
			opacity: 0.4;
		}
		to {
			opacity: 1;
		}
	}
`;

export const SlideContent = styled.div`
	width: 60%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${responsive.tabPort} {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 10;
		grid-template-columns: 1 / -1;
		grid-template-rows: 1 / 2;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.text-box {
		width: 50%;
		height: 50%;

		${responsive.tabPort} {
			width: 100%;
			height: 50%;
		}
	}
`;

export const SlideImage = styled.div`
	position: relative;
	width: 40%;
	height: 100%;
	border-radius: 50% 0 0 50%;
	overflow: hidden;

	${responsive.tabPort} {
		height: 100%;
		border-radius: unset;
		width: 100%;
		order: 1;
		z-index: 5;
		position: absolute;
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}

	img {
		object-fit: cover;
		object-position: top;

		${responsive.tabPort} {
			opacity: 0.3;
		}
	}
`;

export const SlidePreviewContainer = styled.div`
	width: 50vw;
	position: absolute;
	height: 30vh;
	z-index: 10;
	bottom: -15vh;
	left: 50%;
	transform: translateX(-50%);
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 3rem;
	background-color: transparent;

	${responsive.tabPort} {
		width: 90%;
		column-gap: 0rem;
		transform: none;
		height: 20vh;
		position: relative;
		bottom: unset;
		left: unset;
		align-self: center;
	}
`;

export const PreviewItem = styled.div`
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	perspective: 200;
	transform-origin: center;
	position: relative;
	outline: 5px solid black;
	border-radius: 5px;
	overflow: hidden;
	outline: 5px solid var(--primary-light);
	transform: scale(0.7);
	cursor: pointer;

	${responsive.tabPort} {
		outline: none;
	}

	img {
		object-fit: cover;
	}

	&:hover {
		background-color: var(--primary-light);
	}

	&.active {
		outline: 5px solid var(--primary);
		transform: scale(1.05);
		box-shadow: 0 2.5rem 4rem rgba(0, 0, 0, 0.5);
		z-index: 20;

		${responsive.tabPort} {
			outline: none;
		}
	}
`;

export const SlideControllerContainer = styled.div`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);

	${responsive.tabPort} {
		position: absolute;
	}

	.dot {
		cursor: pointer;
		height: 15px;
		width: 15px;
		margin: 0 2px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
		transition: background-color 0.6s ease;

		&.active {
			background-color: #717171;
		}
	}

	${responsive.tabPort} {
		margin: 1.4rem 0;
	}
`;

/** Hot offer Section */
export const HotOffersSection = styled.section`
	grid-column: center-start / center-end;
	margin-top: 15rem;
	margin-bottom: 5rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem 3rem;

	${responsive.tabPort} {
		grid-column: full-start / full-end;
		gap: unset;
		padding: 0 1rem;
	}
`;

export const DiscountCard = styled.div`
	&.discount-card {
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		background-color: white;
		position: relative;
		overflow: hidden;
		padding: 1rem 2rem;
		border-radius: 1rem;

		&__1-of-3 {
			grid-column: 3 / 4;
			background-color: var(--secondary);

			${responsive.mobile} {
				display: none;
			}
		}

		&__2-of-3 {
			grid-column: 1 / 3;

			${responsive.mobile} {
				grid-column: 1 / -1;
			}
		}

		.background {
			background-size: cover;
			right: -13vh;
			top: 13vh;
			opacity: 0.4;
			bottom: 0;
			height: 60vh;
			width: 60vh;
			position: absolute;
			border-radius: 50%;
			overflow: hidden;
			background-image: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url('40-perc.avif');
		}

		.content {
		}
	}
`;

/** Categories */

export const CategoriesSection = styled.div`
	grid-column: center-start / center-end;
	margin: 5rem 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem 3rem;

	${responsive.tabPort} {
		grid-column: full-start / full-end;
		gap: unset;
		padding: 0 1rem;
	}
`;

export const CategoriesCards = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	overflow-y: auto;
	grid-column: 1 / -1;
	background-color: var(--background);
`;

type Props = {
	image: string;
	color: string;
};

export const CategoriesCard = styled.div<Props>`
	display: grid;
	flex-direction: column;
	border-radius: 1.3rem;
	overflow: hidden;
	margin-bottom: 1rem;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

	&.card {
		background-color: ${(props) => props.color};
		position: relative;
		flex-direction: column;
		display: grid;
		align-items: center;
		grid-template-columns: 60% 1fr;
		height: 50vh;
	}

	.background {
		background-image: ${(props) => `url("${props.image}");`};
		background-size: cover;
		background-repeat: no-repeat;
		background-position: left;
		grid-column: 2 / 3;
		grid-row: 1 / 3;
		z-index: 1;
		width: 100%;
		height: 100%;
	}

	.card {
		&__content {
			position: absolute;
			top: 50%;
			z-index: 2;
			transform: translateY(-50%);
			padding: 5rem 0.7rem;
		}

		&__heading {
			font-weight: 700;
			margin: 0;
			margin-bottom: 2rem;
			font-size: 2rem;
			text-transform: capitalize;
		}
	}
`;

/**  Summary Product Section */

export const SampleProductsSection = styled.div`
	grid-column: center-start / center-end;
	margin: 5rem 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem 3rem;

	${responsive.tabPort} {
		grid-column: full-start / full-end;
		gap: unset;
		padding: 0 1rem;
	}
`;

export const SampleProductsContent = styled.div`
	grid-column: 1 / -1;
`;

export const SampleProduct = styled.div`
	&.sample-products {
		position: relative;
		${responsive.tabPort} {
			align-items: center;
			justify-content: center;
		}
	}

	.sample-products {
		&__header {
			font-size: 1.5rem;
			text-transform: capitalize;

			${responsive.tabPort} {
				text-align: center;
			}

			&::after {
				content: '';
				display: block;
				height: 3px;
				width: 20%;
				background-color: var(--primary);

				${responsive.tabPort} {
					display: none;
				}
			}
		}

		&__list {
			padding: 1rem 0;
			${responsive.tabPort} {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.card {
		position: relative;
		height: 13vh;
		cursor: pointer;

		${responsive.tabPort} {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90%;
		}

		:not(:last-child) {
			margin-bottom: 1rem;
		}

		&__side {
			transition: all 0.8s ease;
			position: absolute;
			display: grid;
			height: 100%;
			top: 0;
			left: 0;
			width: 100%;
			backface-visibility: hidden;
			border-radius: 3px;
			overflow: hidden;

			${responsive.tabPort} {
				width: 100%;
			}

			&--front {
				background-color: transparent;
				grid-template-columns: 7rem;
			}

			&--back {
				background-color: white;
				transform: rotateY(180deg);
				grid-template-columns: 1fr min-content;
				align-items: center;
				column-gap: 10px;
				padding: 0 10px;

				button {
					justify-self: center;
				}
			}
		}

		&:hover .card__side--front {
			transform: rotateY(-180deg);
		}

		&:hover .card__side--back {
			transform: rotateY(0);
		}

		&__image {
			border-radius: 50%;
			width: 5rem;
			height: 5rem;
			grid-row: 1 / 3;
		}

		&__name {
			grid-row: 1 / 2;
			grid-column: 2 / 3;
			font-weight: bolder;
			align-self: flex-end;
		}

		&__price {
			grid-row: 2 / 3;
			grid-column: 2 / 3;
		}

		&__back {
			background-color: transparent;
			height: 100%;
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 20px;
		}
	}
`;

export const SubscribeSection = styled.section`
	background-color: var(--primary-light);
	grid-column: full-start / full-end;
	height: 50vh;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 5rem 0;

	${responsive.tabLand} {
		grid-template-columns: 1fr;
		height: max-content;
	}
`;

export const Col_1_of_2 = styled.div`
	&.col-1-of-2 {
		&--right {
			background-size: cover;
			background-position: left;
		}
	}
`;
