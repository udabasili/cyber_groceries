import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { Form, FormDrawer, SelectInput, TextInput } from '@/components/form';
import { CustomTextArea } from '@/components/form/TextArea';
import { category } from '@/data/categories';

import { CreateProductDTO, useCreateProduct } from '../../api/createProduct';

const schema = yup.object().shape({
	name: yup.string().required(),
	imageUrl: yup
		.string()
		.required()
		.matches(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/),
	price: yup.number().required(),
	description: yup.string().required(),
	category: yup.string().required(),
});

const selectionOptions = () => {
	return category.map((value) => ({
		label: value,
		value,
	}));
};

type CreateProductProps = {
	isOpen: boolean;
	close: () => void;
};
export const CreateProduct = ({ isOpen, close }: CreateProductProps) => {
	const { isSuccess, isLoading, createProductFn } = useCreateProduct(close);

	const onSubmit = async (values: CreateProductDTO['data']) => {
		createProductFn({ data: values });
	};

	return (
		<>
			<FormDrawer isDone={isSuccess} close={close} isOpen={isOpen} title="Create Product">
				<Form<CreateProductDTO['data'], typeof schema>
					onSubmitFn={onSubmit}
					schema={schema}
					isSuccess={isSuccess}
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
								name={'imageUrl'}
								label={'Image Url'}
								error={errors['imageUrl']}
								register={register('imageUrl')}
								type={'text'}
								data-cy=""
							/>
							<TextInput
								name={'price'}
								label={'Price'}
								error={errors['price']}
								register={register('price')}
								type={'number'}
								min={10}
								data-cy=""
							/>
							<SelectInput
								error={errors['category']}
								name={'category'}
								label={'Category'}
								register={register('category')}
								placeholder="Pick the Product Category"
								selectOptions={selectionOptions()}
							/>
							<CustomTextArea
								label={'Description'}
								name={'description'}
								error={errors['description']}
								registration={register('description')}
								placeholder={'About the project'}
							/>
							<Button
								isLoading={isLoading}
								type="submit"
								size="md"
								variant="primary"
								disabled={isLoading}
								className="mt-14 self-center justify-self-center"
							>
								Submit Form
							</Button>
						</>
					)}
				</Form>
			</FormDrawer>
		</>
	);
};
