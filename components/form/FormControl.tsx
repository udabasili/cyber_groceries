import clsx from 'clsx';
import React from 'react';
import { FieldError } from 'react-hook-form';

import { CustomErrorMessage, FormControlContainer, Label } from './index.styled';

type FormControlProps = {
	containerClass?: string;
	children: React.ReactNode;
	name: string;
	label: string;
	error: FieldError | undefined;
};

export type CustomFormControlProps = Omit<FormControlProps, 'children'>;

export const FormControl = (props: FormControlProps) => {
	const { children, containerClass, name, label, error } = props;
	return (
		<FormControlContainer className={clsx([containerClass])}>
			{children}
			<Label htmlFor={name} className="form__label">
				{label}
			</Label>
			{error?.message ? <CustomErrorMessage>{error.message}</CustomErrorMessage> : null}
		</FormControlContainer>
	);
};
