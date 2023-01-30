import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { Button } from '@/components/Elements/Button';
import { CustomModal } from '@/components/Elements/Modal';
import { Spinner } from '@/components/Elements/Spinner';
import { Table } from '@/components/Table/Table';

import { useGetAllCustomers } from '../../api/getCustomers';
import { useRemoveCustomers } from '../../api/removeCustomer';
import { ICustomer } from '../../types';

import { UpdateCustomer } from './UpdateCustomer';

export const CustomersTable = () => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState('');
	const { removeCustomer } = useRemoveCustomers(() => setShowDeleteDialog(false));
	const { customers, isLoading } = useGetAllCustomers();
	const [showUpdateCustomerForm, setShowUpdateCustomerForm] = useState(false);

	function onDeleteHandler() {
		removeCustomer(selectedCustomer);
	}

	if (isLoading) {
		return (
			<div className="flex loader items-center justify-center text-gray-500 tabPort:col-span-full col-[1/-1] ">
				<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
			</div>
		);
	}

	if (!customers?.length) {
		return (
			<div className="flex loader items-center justify-center text-gray-500 bg-white h-screen">
				<FaUserFriends className="w-16 h-16" />
				<h4>No Customers Found</h4>
			</div>
		);
	}

	return (
		<div className="col-span-full overflow-x-auto  p-7 tabPort:w-screen tabLand:p-0 tabLand:my-5">
			<Table<ICustomer>
				data={customers || []}
				columns={[
					{
						title: 'Id',
						field: '_id',
					},
					{
						title: 'Customer Name',
						field: 'name',
					},
					{
						title: 'Email',
						field: 'email',
					},
					{
						title: 'Role',
						field: 'role',
					},
					{
						title: 'Joined Date',
						field: 'createdAt',
					},
					{
						title: 'Buttons',
						field: 'createdAt',
						Cell({ entry }: { entry: ICustomer }) {
							return (
								<span className="flex">
									<AiFillEdit
										type="button"
										color="var(--primary)"
										size="1.2rem"
										title="edit"
										className="cursor-pointer hover:opacity-60"
										onClick={() => {
											setSelectedCustomer(entry._id);
											setShowUpdateCustomerForm(true);
										}}
									/>

									<AiFillDelete
										color="red"
										size="1.2rem"
										title="delete"
										className="ml-5 cursor-pointer hover:opacity-60"
										onClick={() => {
											setSelectedCustomer(entry._id);
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
					Are you sure you want to delete this Customer?
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
			{showUpdateCustomerForm ? (
				<UpdateCustomer
					id={selectedCustomer}
					isOpen={showUpdateCustomerForm}
					close={() => setShowUpdateCustomerForm(false)}
				/>
			) : null}
		</div>
	);
};
