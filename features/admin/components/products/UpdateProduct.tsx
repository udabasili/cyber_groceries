import { useState } from 'react';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { Spinner } from '@/components/Elements/Spinner';
import { Form, FormDrawer, SelectInput, TextInput } from '@/components/form';
import { CustomTextArea } from '@/components/form/TextArea';
import { category } from '@/data/categories';

import { useGetProduct } from '../../api/getProduct';
import { UpdateProductDTO, useUpdateProduct } from '../../api/updateProduct';

const schema = yup.object().shape({
	name: yup.string().required(),
	imageUrl: yup.string().required(),
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

type UpdateProductProps = {
	isOpen: boolean;
	close: () => void;
	id: string;
};
export const UpdateProduct = ({ isOpen, close, id }: UpdateProductProps) => {
	const productQuery = useGetProduct({ productId: id });
	const { isLoading, isSuccess, updateProductFn } = useUpdateProduct({ nextFn: close, id });
	const onSubmit = async (values: UpdateProductDTO['data']) => {
		const updatedData = {
			...productQuery.product,
			...values,
		};
		Reflect.deleteProperty(updatedData, 'id');
		Reflect.deleteProperty(updatedData, '_id');
		updateProductFn({ id, data: updatedData });
	};

	return (
		<>
			<FormDrawer isDone={isSuccess} close={close} isOpen={isOpen && Boolean(id)} title="Update Product">
				{productQuery.isLoading ? (
					<div className="h-[20rem] flex items-center justify-center">
						<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />
					</div>
				) : (
					<Form<UpdateProductDTO['data'], typeof schema>
						onSubmitFn={onSubmit}
						schema={schema}
						isSuccess={isSuccess}
						resetDefaultValues={!productQuery.isLoading}
						defaultValues={{
							name: productQuery.product?.name,
							category: productQuery.product?.category,
							price: productQuery.product?.price,
							imageUrl: productQuery.product?.imageUrl,
							description: productQuery.product?.description,
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
									step=".01"
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
				)}
			</FormDrawer>
		</>
	);
};
