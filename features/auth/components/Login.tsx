import React, { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { Form, TextInput } from '@/components/form';
import { adminAccount } from '@/data/sampleUser';
import { useLogin } from '@/lib/auth';

const schema = yup.object().shape({
	email: yup.string().email(),
	password: yup.string().required('No password provided.'),
});

export type LoginValues = {
	email: string;
	password: string;
};

type LoginProps = {
	onSuccess: () => void;
	setAuthStateFn: Dispatch<SetStateAction<'login' | 'register'>>;
};

export const Login = ({ setAuthStateFn }: LoginProps) => {
	const { isLoading, login } = useLogin();
	const onSubmit = async (values: LoginValues) => {
		login(values);
	};

	return (
		<>
			<h1 className="text-xl font-bold center mb-5 self-center"> Sign in to your account </h1>
			<Form<LoginValues, typeof schema>
				onSubmitFn={onSubmit}
				schema={schema}
				resetDefaultValues={true}
				defaultValues={{
					email: adminAccount.email,
					password: adminAccount.password,
				}}
			>
				{({ register, formState: { errors } }) => (
					<>
						<TextInput
							name={'email'}
							label={'Email'}
							error={errors['email']}
							register={register('email')}
							type={'email'}
							data-cy=""
						/>
						<TextInput
							name={'password'}
							label={'Password'}
							error={errors['password']}
							register={register('password')}
							type={'password'}
							data-cy=""
						/>
						<Button type="submit" variant="dark" size="md" isLoading={isLoading} data-cy="submit">
							Submit
						</Button>
						{/* <span
							role="button"
							onClick={() => setAuthStateFn('register')}
							tabIndex={-1}
							onKeyDown={() => (f: unknown) => f}
							className="flex flex-1 mt-5 self-center cursor-pointer text-green-700 text-md font-header hover:opacity-70"
						>
							<p className="">Don&apos;t have an account? </p>
						</span> */}
					</>
				)}
			</Form>
		</>
	);
};
