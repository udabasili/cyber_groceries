import Image from 'next/image';
import { rem } from 'polished';
import styled from 'styled-components';

/* units */
const sizeUnit = 16;

/* sizes */
const createSize = (size: number) => {
	return rem(`${size * sizeUnit}px`) as string;
};

type sizes = Record<string, string>;

export const sizes: sizes = {
	sm: createSize(5),
	md: createSize(6),
	lg: createSize(7),
};

const size = (size: string | number) => {
	if (typeof sizes[size] !== 'undefined') {
		return sizes[size];
	} else {
		return sizes['md'];
	}
};

type WrapperProps = {
	size: keyof typeof sizes;
};

/* components */
export const ImageWrapper = styled.div<WrapperProps>`
	display: block;
	object-fit: cover;
	height: auto;
	width: ${(props) => size(props.size)};
	height: ${(props) => size(props.size)};
	border-radius: 50%;
	overflow: hidden;
	position: relative;
	border: ${rem('4px')} solid var(--primary);
`;

export const Wrapper = styled.div<WrapperProps>`
	box-sizing: border-box;
	padding: ${rem('2px')};
	width: ${(props) => size(props.size)};
	height: ${(props) => size(props.size)};
	background-color: white;
	position: relative;
	display: flex;
	flex-direction: column;

	/* overflow: hidden; */
`;

export const ImageText = styled.span<WrapperProps>`
	position: absolute;
	top: ${(props) => size(props.size)};
	font-weight: bold;
	font-family: var(--paragraph);
	width: 100%;
	margin-top: 10px;
`;
