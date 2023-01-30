import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { Button } from '@/components/Elements/Button';
import { CustomModal } from '@/components/Elements/Modal';
import { PaginationButton } from '@/components/Elements/PaginationButton';
import { Spinner } from '@/components/Elements/Spinner';
import { Table } from '@/components/Table/Table';
import { ProductProps } from '@/features/shop';

import { useGetAllProducts } from '../../api/getAllProducts';
import { useRemoveProducts } from '../../api/removeProduct';

import { UpdateProduct } from './UpdateProduct';

export const ProductsTable = () => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState('');
	const { removeProduct } = useRemoveProducts(() => setShowDeleteDialog(false));
	const [page, setPage] = useState(0);
	const { products, pager, hasMore, isLoading, isPreviousData } = useGetAllProducts({ page });
	const [showUpdateProductForm, setShowUpdateProductForm] = useState(false);

	function onDeleteHandler() {
		removeProduct(selectedProduct);
	}

	if (isLoading) {
		return (
			<div className="flex loader items-center justify-center text-gray-500 tabPort:col-span-full col-[1/-1] ">
				<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
			</div>
		);
	}

	if (!products?.length) {
		return (
			<div className="flex loader items-center justify-center text-gray-500 bg-white h-screen">
				<FaUserFriends className="w-16 h-16" />
				<h4>No Products Found</h4>
			</div>
		);
	}

	return (
		<div className="col-span-full overflow-x-auto  p-7 tabPort:w-screen tabLand:p-0 tabLand:my-5">
			<PaginationButton
				isPreviousData={isPreviousData}
				hasMore={hasMore}
				page={page}
				pager={pager}
				setPage={setPage}
			/>
			<Table<ProductProps>
				data={products || []}
				columns={[
					{
						title: 'Id',
						field: '_id',
					},
					{
						title: 'Product Name',
						field: 'name',
					},
					{
						title: 'Category',
						field: 'category',
					},
					{
						title: 'Price',
						field: 'price',
					},
					{
						title: 'Buttons',
						field: 'price',
						Cell({ entry }: { entry: ProductProps }) {
							return (
								<span className="flex">
									<AiFillEdit
										type="button"
										color="var(--primary)"
										size="1.2rem"
										title="edit"
										className="cursor-pointer hover:opacity-60"
										onClick={() => {
											setSelectedProduct(entry._id);
											setShowUpdateProductForm(true);
										}}
									/>

									<AiFillDelete
										color="red"
										size="1.2rem"
										title="delete"
										className="ml-5 cursor-pointer hover:opacity-60"
										onClick={() => {
											setSelectedProduct(entry._id);
											setShowDeleteDialog(true);
										}}
									/>
								</span>
							);
						},
					},
				]}
			/>
			<CustomModal
				onClose={() => setShowDeleteDialog(false)}
				isOpen={showDeleteDialog}
				bodyClassName="text-center"
			>
				<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
				<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want to delete this Product?
				</h3>
				<div className="flex justify-center gap-4">
					<Button size="md" variant="danger" onClick={onDeleteHandler} type="button">
						Yes, I&apos;m sure
					</Button>
					<Button size="md" variant="inverse" onClick={() => setShowDeleteDialog(false)} type="button">
						No, cancel
					</Button>
				</div>
			</CustomModal>
			{showUpdateProductForm ? (
				<UpdateProduct
					id={selectedProduct}
					isOpen={showUpdateProductForm}
					close={() => setShowUpdateProductForm(false)}
				/>
			) : null}
		</div>
	);
};
