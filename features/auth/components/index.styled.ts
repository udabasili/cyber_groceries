import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const AuthContainer = styled.div`
	grid-column: full-start / full-end;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-image: url('/auth.jpg');
	background-size: cover;
	height: 90vh;
`;

export const AuthContent = styled.section`
	background-color: white;
	width: max-content;
	height: max-content;
	display: flex;
	flex-direction: column;
	padding: 3rem 5rem;
	width: 40vw;
	max-height: 70vh;
	overflow-y: auto;

	${responsive.tabPort} {
		width: max-content;
	}

	button {
		flex: 1;
		margin-top: 2rem;
	}
`;
