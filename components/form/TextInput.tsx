import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { CustomFormControlProps, FormControl } from './FormControl';
import { InputContainer } from './index.styled';

type TextInputProps = CustomFormControlProps & {
	name: string;
	label: string;
	register: Partial<UseFormRegisterReturn>;
	type: 'text' | 'email' | 'password' | 'date' | 'checkbox';
	placeholder?: string;
	required?: boolean;
	className?: string;
};

export const TextInput = (props: TextInputProps) => {
	const { containerClass, name, label, register, error, type, placeholder, required } = props;
	return (
		<FormControl error={error} containerClass={containerClass} name={name} label={label}>
			<InputContainer
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				required={required}
				{...register}
			/>
		</FormControl>
	);
};
