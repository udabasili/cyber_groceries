import styled from 'styled-components';

export const CartContainer = styled.div`
	position: absolute;
	top: calc(100% + 4px);
	right: 0;
	width: 400px;
	padding: 20px;
	border: 1px solid #e4e4d9;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	background-color: #ffffff;
	opacity: 0;
`;

export const CartBody = styled.div`
	padding: 1.3rem 0;
	display: flex;
	flex-direction: column;

	.no-products {
		font-size: 1.2rem;
		text-align: center;
	}
`;
export const CartFooter = styled.div`
	display: flex;
	justify-content: space-evenly;
	border-top: solid 2px #e4e4d9;
	padding: 15px 0;
`;

export const CartItemContainer = styled.div`
	display: grid;
	height: max-content;
	grid-template-columns: min-content max-content 1fr max-content min-content min-content;
	align-items: center;
	font-size: 0.9rem;
	font-weight: bold;

	&:not(:last-child) {
		margin-bottom: 10px;
	}

	.image-container {
		width: 4rem;
		height: 4rem;
		border: solid 2px #e4e4d9;
		position: relative;

		img {
			object-fit: cover;
		}
	}

	.quantity {
		margin: 0 6px;
	}

	.name {
		text-align: left;
	}

	.price {
		margin: 0 5px;
	}

	svg {
		color: red;
	}
`;
