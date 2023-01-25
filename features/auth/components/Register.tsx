import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { Form, TextInput } from '@/components/form';
import { useRegister } from '@/lib/auth';

const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email(),
	password: yup
		.string()
		.required('No password provided.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

type RegisterValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type RegisterProps = {
	onSuccess: () => void;
	setAuthStateFn: Dispatch<SetStateAction<'login' | 'register'>>;
};

export const Register = ({ setAuthStateFn }: RegisterProps) => {
	const { isLoading, register } = useRegister();
	const onSubmit = async (values: RegisterValues) => {
		register({ ...values, role: 'User' });
	};

	return (
		<div>
			<h1 className="text-xl font-bold center mb-5 self-center"> Create a new Account </h1>

			<Form<RegisterValues, typeof schema> onSubmitFn={onSubmit} schema={schema}>
				{({ register, formState: { errors } }) => (
					<>
						<TextInput
							name={'name'}
							label={'Name'}
							error={errors['name']}
							register={register('name')}
							type={'text'}
						/>
						<TextInput
							name={'email'}
							label={'Email'}
							error={errors['email']}
							register={register('email')}
							type={'email'}
						/>
						<TextInput
							name={'password'}
							label={'Password'}
							error={errors['password']}
							register={register('password')}
							type={'password'}
						/>
						<TextInput
							name={'confirmPassword'}
							label={'Confirm Password'}
							error={errors['confirmPassword']}
							register={register('confirmPassword')}
							type={'password'}
						/>
						<Button type="submit" variant="dark" size="md" isLoading={isLoading}>
							Submit
						</Button>
						<span
							role="button"
							onClick={() => setAuthStateFn('login')}
							tabIndex={-1}
							onKeyDown={() => (f: unknown) => f}
							className="flex flex-1 mt-5 self-center cursor-pointer text-green-700 text-md font-header hover:opacity-70"
						>
							<p className="">Already an account? </p>
						</span>
					</>
				)}
			</Form>
		</div>
	);
};
