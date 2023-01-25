import styled from 'styled-components';

export const FormControlContainer = styled.div`
	width: 100%;
	background-color: white;
	position: relative;
	display: grid;
	margin: 0.4rem 0;
	border: 1px solid black;
	grid-column: 1;
	border-radius: 4px;
`;
export const InputContainer = styled.input`
	border: none;
	font-size: 1.1rem;
	padding: 0.4rem 1.4rem;
	outline: none;
	background-color: transparent;

	&.text-area {
		border: none;
		padding: 0.8rem 0;
		padding-left: 1rem;
		outline: none;

		&:focus ~ .form__label {
			font-size: 0.7rem;
		}
	}

	&:focus ~ .form__label {
		font-size: 0.6rem;
	}

	&:focus {
		color: #495057;
		background-color: #fff;
		border-color: #80bdff;
		outline: 0;
		box-shadow: none !important;
	}
`;

export const Label = styled.label`
	grid-row: 1;
	font-size: 0.8rem;
	margin-left: 1rem;
	justify-self: flex-start;
	font-weight: bold;
	font-family: var(--header);
`;

export const CustomErrorMessage = styled.div`
	color: red;
	margin-left: 0.8rem;
	justify-self: flex-start;
	font-size: 0.8rem;
	font-weight: 600;
	padding-bottom: 0.3rem;
`;

export const FormContainer = styled.form`
	width: 100%;
	flex-direction: column;
	display: flex;

	button {
		justify-content: center;
	}
`;
