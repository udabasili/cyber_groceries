/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { DeepPartial, FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import Lazy from 'yup/lib/Lazy';

import { FormContainer } from './index.styled';

type FormProps<FormValues extends FieldValues, FormSchema> = {
	schema: FormSchema;
	onSubmitFn: (values: FormValues) => void;
	children: (methods: UseFormReturn<FormValues, unknown>) => React.ReactNode;
	options?: UseFormProps<FormValues>;
	isSuccess?: boolean;
	defaultValues?: DeepPartial<FormValues>;
	resetDefaultValues?: boolean;
};

export const Form = <
	TFormValues extends Record<string, unknown>,
	TFormShema extends yup.AnyObjectSchema | Lazy<any, unknown>
>(
	props: FormProps<TFormValues, TFormShema>
) => {
	const { schema, onSubmitFn, children, options, isSuccess, defaultValues, resetDefaultValues } = props;
	const methods = useForm<TFormValues>({
		...options,
		resolver: yupResolver(schema),
		mode: 'onChange',
	});
	useEffect(() => {
		if (defaultValues && resetDefaultValues) {
			methods.reset({ ...defaultValues });
		}
	}, [defaultValues, methods, resetDefaultValues]);

	useEffect(() => {
		if (isSuccess) {
			methods.reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return <FormContainer onSubmit={methods.handleSubmit(onSubmitFn)}>{children(methods)}</FormContainer>;
};
