import { Select, TextInput } from 'flowbite-react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormAdd } from 'react-icons/gr';

import { Button } from '@/components/Elements/Button';

import { Header } from './index.styled';

export const DashboardHeader = () => {
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
			>
				Add Product
			</Button>
		</Header>
	);
};
