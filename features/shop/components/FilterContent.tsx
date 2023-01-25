/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect } from 'react';

import { Header3 } from '@/components/Elements/Headings';
import { categories, category } from '@/data/categories';

import { FilterProps } from '../types';

import { FilterContentContainer, Slider } from './index.styled';

type Props = {
	className?: string;
	addCategory: (value: typeof category[number]) => void;
	removeCategory: (value: typeof category[number]) => void;
	filterValues: FilterProps;
	setPrices: (value: [number, number]) => void;
};

export const FilterContent = (props: Props) => {
	const { className, addCategory, removeCategory, filterValues, setPrices } = props;
	const [filterValue, setValue] = React.useState<[number, number]>([2, 50]);

	function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const currentNumbers: [number, number] = [...filterValue];
		if (e.target.id === 'max') {
			currentNumbers[1] = Number(e.target.value);
		} else {
			currentNumbers[0] = Number(e.target.value);
		}
		setValue(currentNumbers);
	}

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as typeof category[number];
		if (filterValues.categories.includes(value)) {
			removeCategory(value);
		} else {
			addCategory(value);
		}
	};

	useEffect(() => {
		setPrices(filterValue);
	}, [filterValue]);

	return (
		<FilterContentContainer className={className}>
			<div className="filter">
				<Header3 className="filter__header">Price Range</Header3>
				<Slider
					value={filterValue}
					onChange={(value, index) => setValue(value as [number, number])}
					className="slider"
					trackClassName="slider-track"
					thumbClassName="slider-thumb"
					markClassName="slider-mark"
					marks={20}
					min={2}
					max={400}
				/>
				<div className="flex">
					<div className="flex mr-5">
						<span className="inline-flex items-center px-3 text-sm text-white bg-gray-200 border border-r-0 border-gray-300 rounded-l-md bg-black">
							$
						</span>
						<input
							type="number"
							id="min"
							onChange={onChangeHandler}
							className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							value={filterValue[0]}
						/>
					</div>
					<div className="flex">
						<span className="inline-flex items-center px-3 text-sm text-white bg-gray-200 border border-r-0 border-gray-300 rounded-l-md bg-black">
							$
						</span>
						<input
							type="number"
							id="max"
							onChange={onChangeHandler}
							value={filterValue[1]}
							className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						/>
					</div>
				</div>
			</div>
			<div className="filter">
				<Header3 className="filter__header">Categories</Header3>
				<ul className="w-full text-sm font-medium text-gray-900 bg-white  ">
					{categories.map((cat) => (
						<li
							className="w-full  border border-[#F2F3F4] rounded-lg hover:border-secondary mb-3 cursor-pointer"
							key={cat.name}
						>
							<div className="flex items-center pl-3">
								<input
									id={cat.name}
									type="checkbox"
									onChange={handleCheckboxChange}
									checked={filterValues.categories.includes(cat.name as typeof category[number])}
									value={cat.name}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
								/>
								<label
									htmlFor={cat.name}
									className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{cat.name}
								</label>
							</div>
						</li>
					))}
				</ul>
			</div>
		</FilterContentContainer>
	);
};
