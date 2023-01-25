/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import Lazy from 'yup/lib/Lazy';

import { FormContainer } from './index.styled';

type FormProps<FormValues extends FieldValues, FormSchema> = {
	schema: FormSchema;
	onSubmitFn: (values: FormValues) => void;
	children: (methods: UseFormReturn<FormValues, unknown>) => React.ReactNode;
	options?: UseFormProps<FormValues>;
};

export const Form = <
	TFormValues extends Record<string, unknown>,
	TFormShema extends yup.AnyObjectSchema | Lazy<any, unknown>
>(
	props: FormProps<TFormValues, TFormShema>
) => {
	const { schema, onSubmitFn, children, options } = props;
	const methods = useForm<TFormValues>({
		...options,
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	return <FormContainer onSubmit={methods.handleSubmit(onSubmitFn)}>{children(methods)}</FormContainer>;
};
