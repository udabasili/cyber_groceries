import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { Spinner } from '@/components/Elements/Spinner';
import { Form, FormDrawer, SelectInput, TextInput } from '@/components/form';

import { useGetCustomer } from '../../api/getCustomer';
import { UpdateCustomerDTO, useUpdateCustomer } from '../../api/updateCustomer';

const roles = ['Admin', 'User'];

const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email(),
	role: yup.string().required(),
});

const selectionOptions = () => {
	return roles.map((value) => ({
		label: value,
		value,
	}));
};

type UpdateCustomerProps = {
	isOpen: boolean;
	close: () => void;
	id: string;
};
export const UpdateCustomer = ({ isOpen, close, id }: UpdateCustomerProps) => {
	const customerQuery = useGetCustomer({ customerId: id });
	const { isLoading, isSuccess, updateCustomerFn } = useUpdateCustomer({ nextFn: close, id });
	const onSubmit = async (values: UpdateCustomerDTO['data']) => {
		const updatedData = {
			...customerQuery.customer,
			...values,
		};
		Reflect.deleteProperty(updatedData, 'id');
		Reflect.deleteProperty(updatedData, '_id');
		updateCustomerFn({ id, data: updatedData });
	};

	return (
		<>
			<FormDrawer isDone={isSuccess} close={close} isOpen={isOpen && Boolean(id)} title="Update Customer">
				{customerQuery.isLoading ? (
					<div className="h-[20rem] flex items-center justify-center">
						<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />
					</div>
				) : (
					<Form<UpdateCustomerDTO['data'], typeof schema>
						onSubmitFn={onSubmit}
						schema={schema}
						isSuccess={isSuccess}
						resetDefaultValues={!customerQuery.isLoading}
						defaultValues={{
							name: customerQuery.customer?.name,
							email: customerQuery.customer?.email,
							role: customerQuery.customer?.role,
						}}
					>
						{({ register, formState: { errors } }) => (
							<>
								<TextInput
									name={'name'}
									label={'Name'}
									error={errors['name']}
									register={register('name')}
									type={'text'}
									data-cy=""
								/>
								<TextInput
									name={'email'}
									label={'Email'}
									error={errors['email']}
									register={register('email')}
									type={'email'}
									data-cy=""
								/>
								<SelectInput
									error={errors['role']}
									name={'role'}
									label={'Role'}
									register={register('role')}
									placeholder="Pick the Role"
									selectOptions={selectionOptions()}
								/>

								<Button
									isLoading={isLoading}
									type="submit"
									size="md"
									variant="primary"
									disabled={isLoading}
									className="mt-14 self-center justify-self-center"
								>
									Submit
								</Button>
							</>
						)}
					</Form>
				)}
			</FormDrawer>
		</>
	);
};
