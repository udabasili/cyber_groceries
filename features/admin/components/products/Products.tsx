import { TextInput, Select } from 'flowbite-react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from '@/components/Elements/Button';
import { useDisclosure } from '@/hooks/useDisclosure';

import { Header } from '../index.styled';

import { CreateProduct } from './CreateProduct';
import { ProductsTable } from './ProductsTable';

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
			<CreateProduct isOpen={isOpen} close={close} />
		</Header>
	);
};
export const Products = () => {
	return (
		<div className="flex flex-1 flex-col">
			<DashboardHeader />
			<ProductsTable />
		</div>
	);
};
