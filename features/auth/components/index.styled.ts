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
	min-height: 100vh;
`;

export const AuthContent = styled.section`
	background-color: white;
	width: max-content;
	height: max-content;
	display: flex;
	flex-direction: column;
	padding: 3rem 5rem;
	width: 40vw;
	min-height: 70vh;
	overflow-y: auto;

	${responsive.tabPort} {
		width: 70vw;
	}

	button {
		flex: 1;
		margin-top: 2rem;
	}
`;
