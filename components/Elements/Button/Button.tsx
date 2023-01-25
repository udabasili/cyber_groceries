/* eslint-disable no-mixed-spaces-and-tabs */
import clsx from 'clsx';
import React from 'react';

import { Spinner } from '../Spinner';

import { ButtonComponent } from './index.styled';

const variants = {
	primary: 'primary',
	inverse: 'inverse',
	success: 'success',
	dark: 'dark',
	danger: 'danger',
};

const sizes = {
	sm: 'sm',
	md: 'md',
	lg: 'lg',
};

type IconProps =
	| {
			startIcon: React.ReactElement;
			endIcon?: never;
	  }
	| {
			startIcon?: never;
			endIcon: React.ReactElement;
	  }
	| {
			startIcon?: undefined;
			endIcon?: undefined;
	  };

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	size: keyof typeof sizes;
	variant: keyof typeof variants;
	isLoading?: boolean;
	type: 'button' | 'submit';
} & IconProps;

export const Button = (props: ButtonProps) => {
	const { size, startIcon, endIcon, variant, isLoading, type, className, disabled, ...otherProps } = props;
	return (
		<ButtonComponent
			type={type}
			className={clsx([sizes[size], variants[variant], className, disabled ? 'disabled' : ''])}
			{...otherProps}
		>
			{isLoading && <Spinner size="sm" />}
			{!isLoading && startIcon}
			<span>{otherProps.children}</span>
			{!isLoading && endIcon}
		</ButtonComponent>
	);
};
