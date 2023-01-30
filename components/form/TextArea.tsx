import clsx from 'clsx';
import { Textarea } from 'flowbite-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FormControl, CustomFormControlProps } from './FormControl';
import { TextArea } from './index.styled';

type TextAreaProps = CustomFormControlProps & {
	registration: Partial<UseFormRegisterReturn>;
	placeholder: string;
	required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const CustomTextArea = (props: TextAreaProps) => {
	const { label, containerClass, name, placeholder, required, error, registration, ...otherProps } = props;
	return (
		<FormControl
			label={label}
			containerClass={clsx(['form-control--text-area', containerClass])}
			name={name}
			error={error}
		>
			<TextArea
				id={name}
				placeholder={placeholder}
				required={required}
				rows={4}
				{...otherProps}
				{...registration}
			/>
		</FormControl>
	);
};
