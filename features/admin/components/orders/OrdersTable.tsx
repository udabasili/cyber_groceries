import { nanoid } from 'nanoid';
import { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';

import { Drawer } from '@/components/Elements/Drawer';
import { Spinner } from '@/components/Elements/Spinner';
import { Table } from '@/components/Table/Table';
import { useDisclosure } from '@/hooks/useDisclosure';

import { useGetAllOrders } from '../../api/getOrders';
import { IOrder } from '../../types';

export const OrderTable = () => {
	const [selectedItem, setSelectedItem] = useState<string>();
	const { orders, isLoading } = useGetAllOrders();
	const { isOpen, open, close } = useDisclosure();

	if (isLoading) {
		return (
			<div className="flex loader items-center justify-center text-gray-500 tabPort:col-span-full col-[1/-1] ">
				<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
			</div>
		);
	}

	if (!orders?.length) {
		return (
			<div className="flex loader items-center justify-center text-gray-500 bg-white h-screen">
				<h4>No Order Found</h4>
			</div>
		);
	}

	return (
		<>
			<div className="col-span-full overflow-x-auto  p-7 tabPort:w-screen tabLand:p-0 tabLand:my-5">
				<Table<IOrder>
					data={orders}
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
							title: 'No ofItems',
							field: 'items',
							Cell({ entry }: { entry: IOrder }) {
								return <>{entry.items.length.toString()}</>;
							},
						},
						{
							title: '',
							field: 'items',
							Cell({ entry }: { entry: IOrder }) {
								return (
									<div className="flex">
										<AiFillEye
											type="button"
											color="var(--primary)"
											size="1.2rem"
											title="View Items"
											className="cursor-pointer hover:opacity-60"
											onClick={() => {
												setSelectedItem(entry._id);
												open();
											}}
										/>
									</div>
								);
							},
						},
					]}
				/>
			</div>
			{isOpen && Boolean(selectedItem) ? (
				<Drawer isOpen={isOpen && Boolean(selectedItem)} close={close} title={'Order Items'}>
					<div className="w-full mt-5">
						<ul className="max-w-md ">
							{orders
								.filter((item) => item._id === selectedItem)[0]
								.items.map((item, key) => (
									<li className="pb-3 sm:pb-4" key={nanoid()}>
										<div className="flex items-center space-x-4">
											<div className="flex-1 min-w-0">
												<p className="text-md  text-black font-header">
													{item.price_data.product_data.name}
												</p>
												<p className="text-sm  font-medium text-gray-900 truncate dark:text-white">
													Quantity: {item.quantity}
												</p>
											</div>
											<div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
												${Math.trunc(item.price_data.unit_amount) / 100}
											</div>
										</div>
									</li>
								))}
						</ul>
					</div>
				</Drawer>
			) : null}
		</>
	);
};
