import styled from 'styled-components';

export const CheckoutSection = styled.section`
	display: grid;
	grid-column: full-start / full-end;
	grid-template-columns: repeat(2, 1fr);
	min-height: 100vh;
	overflow-y: auto;
`;

export const Container = styled.div`
	&.form {
		display: flex;
	}
	&.summary {
		background-color: var(--background);
	}
`;

export const CheckOutItemContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column: 1 / -1;
	column-gap: 2rem;
	row-gap: 0.2rem;

	.image {
		grid-column: 1 / 2;
		grid-row: 1/ 6;
		position: relative;

		img {
			object-fit: cover;
		}
	}
	.price {
		font-size: 1rem;
		font-weight: 600;
	}

	.category {
		font-weight: 500;
		text-transform: capitalize;
	}
`;

/** CheckoutForm */

export const StripeLabel = styled.label`
	color: black;
	font-weight: bold;
	letter-spacing: 0.025em;

	input,
	.StripeElement {
		display: block;
		margin: 10px 0 20px 0;
		max-width: 500px;
		padding: 10px 14px;
		font-size: 1em;
		font-family: 'Source Code Pro', monospace;
		box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
		border: 0;
		outline: 0;
		border-radius: 4px;
		background: white;

		&:focus {
		}
	}

	input::placeholder {
		color: #aab7c4;
	}

	input:focus,
	.StripeElement--focus {
		box-shadow: none;
		outline: none;
		border: none;
	}

	.StripeElement.IdealBankElement,
	.StripeElement.FpxBankElement,
	.StripeElement.PaymentRequestButton {
		padding: 0;
	}

	.StripeElement.PaymentRequestButton {
		height: 40px;
	}
`;
