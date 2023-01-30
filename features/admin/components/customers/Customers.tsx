import { TextInput, Select } from 'flowbite-react';
import React from 'react';

import { Header } from '../index.styled';

import { CustomersTable } from './CustomersTable';

const DashboardHeader = () => {
	return (
		<Header>
			<TextInput id="search" type="search" placeholder="Search for customers" className="bg-gray-100" />
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
		</Header>
	);
};
export const Customers = () => {
	return (
		<div className="flex flex-1 flex-col">
			<DashboardHeader />
			<CustomersTable />
		</div>
	);
};
