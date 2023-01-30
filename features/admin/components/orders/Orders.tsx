import { TextInput, Select } from 'flowbite-react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from '@/components/Elements/Button';
import { useDisclosure } from '@/hooks/useDisclosure';

import { Header } from '../index.styled';

import { OrderTable } from './OrdersTable';

const DashboardHeader = () => {
	const { close, open, isOpen } = useDisclosure();

	return (
		<Header>
			<TextInput id="search" type="search" placeholder="Search for products" className="bg-gray-100" />
			<Select id="countries" required={true} className="bg-gray-100">
				<option>United States</option>
				<option>Canada</option>
				<option>France</option>
				<option>Germany</option>
			</Select>
			<Select id="prices" required={true}>
				<option>United States</option>
				<option>Canada</option>
				<option>France</option>
				<option>Germany</option>
			</Select>
			<Button
				size="md"
				variant="primary"
				type="button"
				startIcon={<AiOutlinePlus color="white" className="hover:bg-gray" />}
				className="justify-self-center tabLand:text-sm "
				onClick={open}
			>
				Add Product
			</Button>
		</Header>
	);
};
export const Orders = () => {
	return (
		<div className="flex flex-1 flex-col">
			<DashboardHeader />
			<OrderTable />
		</div>
	);
};
