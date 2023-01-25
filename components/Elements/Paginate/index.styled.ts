import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

import colors from '@/constant/colors';
import { responsive } from '@/utils/responsive';

const MyPaginate = styled(ReactPaginate)`
	margin-bottom: 2rem;
	grid-column: 1 / -1;
	height: 7vh;
	display: flex;
	background-color: ${colors.secondary};
	flex-direction: row;
	width: 100%;
	justify-self: center;
	justify-content: space-between;
	align-items: center;
	list-style-type: none;

	${responsive.tabPort} {
		margin-top: 1rem;
	}

	li a {
		cursor: pointer;
		font-size: 1.3rem;
		font-weight: bold;
		color: white;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
	}
	li.previous,
	li.next {
		flex-basis: 30%;
		display: flex;
		justify-content: center;
		align-self: stretch;
		color: white;
		align-items: center;
		background-color: ${colors.secondary};
	}
	li.next a,
	li.break a {
		border-color: transparent;
	}
	li.selected,
	li.active a {
		border-color: var(--primary);
		color: var(--primary);
	}
	li.disabled a {
		color: #d3d3d3;
	}
	li.disable,
	li.disabled a {
		cursor: default;
	}
`;

MyPaginate.defaultProps = { activeClassName: 'active' };
export { MyPaginate };
