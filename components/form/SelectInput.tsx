import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { CustomFormControlProps, FormControl } from './FormControl';

type SelectProps = {
	label: React.ReactNode;
	value: string | number | string[];
};
type SelectInputProps = CustomFormControlProps & {
	register: Partial<UseFormRegisterReturn>;
	containerClass: string;
	selectOptions: Array<SelectProps>;
	defaultValue?: string;
	placeholder?: string;
};

export const SelectInput = (props: SelectInputProps) => {
	const { containerClass, name, error, label, selectOptions, register, defaultValue, placeholder } = props;
	return (
		<FormControl name={name} label={label} error={error} containerClass={containerClass}>
			<select
				id={name}
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				{...register}
			>
				{selectOptions.map(({ label, value }) => (
					<option key={label?.toString()} value={value}>
						{label}
					</option>
				))}
			</select>
		</FormControl>
	);
};
