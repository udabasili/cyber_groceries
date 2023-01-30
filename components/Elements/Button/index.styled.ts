import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const ButtonComponent = styled.button`
	display: inline-flex;
	align-items: center;
	font-family: var(--paragraph);
	height: 2.5rem;
	font-size: 1rem;
	font-weight: 500;
	text-decoration: none;
	padding: 0 0.9375rem;
	border: 2px solid;
	color: #fff;
	border-radius: 4px;
	border-color: transparent;
	box-shadow: none;
	outline: none;
	appearance: none;
	transition: all 0.2s cubic-bezier(0.28, 0.12, 0.22, 1);

	& > * {
		margin-right: 2px;
	}

	&.sm {
		padding: 12px 22px;
		font-size: 0.7rem;
		line-height: 16px;

		${responsive.mobile} {
			font-size: 0.6rem;
		}
	}

	&.md {
		padding: 16px 30px;
		font-size: 0.9rem;
		line-height: 16px;

		${responsive.mobile} {
			font-size: 0.8rem;
		}
	}

	&.lg {
		padding: 18px 36px;
		font-size: 1.2rem;
		line-height: 20px;
	}

	&.primary {
		background-color: var(--primary);
		color: white;
		border-color: var(--primary);

		&:hover {
			background-color: var(--primary-light);
			color: gray;
		}
	}

	&.inverse {
		background-color: #fff;
		color: var(--primary);
		border-color: var(--primary);

		&:hover {
			background-color: var(--primary);
			color: #fff;
		}
	}

	&.danger {
		background-color: #df373b;
		color: #fff;
		border-color: #df373b;

		&:hover {
			background-color: rgb(254 242 242);
			color: #df373b;
		}
	}

	&.dark {
		background-color: black;
		color: #fff;

		&:hover {
			background-color: rgb(75 85 99);
			color: white;
		}
	}

	&.success {
		background-color: rgb(132 204 22);
		color: #fff;

		&:hover {
			background-color: rgb(220 252 231);
			color: black;
		}
	}

	&.disabled {
		border: 1px solid #999999;
		background-color: #cccccc;
		color: #666666;
		pointer-events: none;
	}
`;
