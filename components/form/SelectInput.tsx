import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { CustomFormControlProps, FormControl } from './FormControl';
import { SelectContainer } from './index.styled';

type SelectProps = {
	label: React.ReactNode;
	value: string | number | string[];
};
type SelectInputProps = CustomFormControlProps & {
	register: Partial<UseFormRegisterReturn>;
	containerClass?: string;
	selectOptions: Array<SelectProps>;
	defaultValue?: string;
	placeholder?: string;
};

export const SelectInput = (props: SelectInputProps) => {
	const { containerClass, name, error, label, selectOptions, register, defaultValue, placeholder } = props;
	return (
		<FormControl name={name} label={label} error={error} containerClass={containerClass}>
			<SelectContainer
				id={name}
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className=" text-sm block w-full p-2.5"
				{...register}
			>
				<option disabled defaultChecked>
					{placeholder}
				</option>
				{selectOptions.map(({ label, value }) => (
					<option key={label?.toString()} value={value}>
						{label}
					</option>
				))}
			</SelectContainer>
		</FormControl>
	);
};
