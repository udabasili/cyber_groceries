import Link from 'next/link';
import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const MainNavigationContainer = styled.div`
	grid-column: full-start / full-end;
	background-color: rgb(255, 255, 255);
	top: 0;
	position: absolute;
	left: 0;
	width: 100vw;
	display: grid;
	grid-template-columns: 1fr;
	z-index: 90;

	.row {
		display: grid;
		align-items: center;
		padding: 1rem;
	}

	.navigation-top {
		grid-template-columns: 1fr max-content min-content;
	}

	.navigation-bottom {
		grid-template-columns: 1fr max-content min-content;

		.nav-background {
			display: none;
			background-color: rgba(0, 0, 0, 1);
			top: 0;
			left: 0;
			z-index: 40;
			position: fixed;
			height: 100vh;
		}
	}
`;

/** APP LOGO */

export const AppLogo = styled.div`
	display: flex;
	font-size: 1.3rem;
	font-family: var(--header);
	color: var(--primary-light);
	align-items: center;

	${responsive.tabPort} {
		font-size: 1rem;

		img {
			width: 1.5rem;
			height: 1.5rem;
		}
	}

	span {
		margin-left: 10px;
	}
`;

/** NavigationMenu */

export const NavigationMenu = styled.ul`
	display: flex;
`;

export const NavigationMenuItem = styled.li`
	list-style: none;
	margin-right: 20px;
	display: flex;
	font-size: 1rem;
	font-family: var(--header);
	font-weight: 600;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	color: var(--primary);
	cursor: pointer;

	&:hover a {
		color: var(--primary-light);
	}

	svg {
		margin-right: 6px;
	}

	span {
		${responsive.tabPort} {
			display: none;
		}
	}

	&:hover {
		color: var(--primary-light);
	}
`;

export const NavigationMenuLink = styled(Link)`
	all: inherit;

	&:hover {
		color: var(--primary-light);
	}
`;

/** Nav */

export const Nav = styled.nav`
	display: flex;
	justify-content: space-evenly;
	position: relative;
	z-index: unset;

	${responsive.tabPort} {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		z-index: 200;
		width: 0;
		justify-content: center;
		background-color: white;
		flex-direction: column;
		overflow: hidden;
	}

	.close-button {
		display: none;

		${responsive.tabPort} {
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			margin: 2rem;
			font-size: 2.3rem;
			cursor: pointer;
			color: red;
		}
	}
`;

export const NavItem = styled.li`
	&:hover a {
		color: #0000;
	}

	${responsive.tabPort} {
		margin: 0.6rem 0;
		font-size: 1.4rem;
	}
`;

export const NavLink = styled.a`
	&:visited,
	&:link {
		color: var(--primary);
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		font-family: var(--header);
		list-style: none;
		text-transform: capitalize;
		padding: 1rem 2rem;

		${responsive.tabPort} {
			color: black;
		}
	}

	&:hover {
		color: var(--primary-light);
	}

	&.active {
		color: black;
		border-bottom: 2px solid black;

		${responsive.tabPort} {
			border-bottom: none;
		}
	}

	svg {
		margin-right: 6px;
	}
`;

/** Mobile Navigation */

export const MobileNavButton = styled.label`
	display: none;

	${responsive.tabPort} {
		display: block;
		width: 2.5rem;
		height: 2.5rem;
		margin-right: 2rem;
		border: 0.3px solid black;
		background-color: transparent;
		justify-self: flex-start;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.navigation-icon {
		&,
		&::before,
		&::after {
			display: block;
			height: 4px;
			width: 2rem;
			background-color: black;
			position: relative;
		}

		&::before,
		&::after {
			content: ' ';
			position: absolute;
		}

		&::before {
			top: -0.5rem;
		}

		&::after {
			top: 0.5rem;
		}
	}
`;

export const MobileNavInput = styled.input`
	display: none;

	${responsive.tabPort} {
		color: black;

		&:checked ~ nav {
			width: 50vw;
		}

		&:checked ~ .nav-background {
			width: 100vw;
			display: block;
		}

		&:checked + .navigation-button .navigation-icon {
			& {
				background-color: transparent;
			}

			&::before {
				top: 0;
				transform: rotate(45deg);
			}

			&::after {
				top: 0;
				transform: rotate(-45deg);
			}
		}
	}

	${responsive.mobile} {
		&:checked ~ nav {
			width: 100vw;
		}
	}
`;

export const NavigationCart = styled.div`
	border: 2px solid var(--primary);
	display: flex;
	position: relative;
	display: flex;
	margin-right: 1rem;
	cursor: pointer;

	&:hover .cart {
		opacity: 1;
		${responsive.tabPort} {
			opacity: 0;
		}
	}

	&.active .cart {
		${responsive.tabPort} {
			opacity: 1 !important;
		}
	}

	${responsive.tabPort} {
		border: none;
		font-size: 2rem;
		margin-right: 2rem;
	}

	.mobile-cart {
		display: none;

		${responsive.tabPort} {
			display: block;
		}
	}
	.navigation-cart-label {
		display: flex;
		margin: 10px;
		font-size: 1rem;
		font-weight: bold;
		align-items: center;
		color: black;

		${responsive.tabPort} {
			display: none;
		}

		svg {
			margin-right: 10px;
		}
	}
`;

export const CartDropDown = styled.div`
	position: absolute;
`;
