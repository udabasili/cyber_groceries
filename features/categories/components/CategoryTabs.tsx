/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FaCookie } from 'react-icons/fa';
import { GiFruitBowl, GiTomato } from 'react-icons/gi';
import { TbBrandCucumber, TbMeat, TbMilk } from 'react-icons/tb';

import { CustomTabs, TabGroup, TabItem } from './index.styled';

type Category = {
	name: string;
	icon: IconType;
};

const categoryIcons = [
	{
		name: 'fruits',
		icon: GiFruitBowl,
	},
	{
		name: 'vegetables',
		icon: GiTomato,
	},
	{
		name: 'meat',
		icon: TbMeat,
	},
	{
		name: 'bakery',
		icon: FaCookie,
	},
	{
		name: 'vegan',
		icon: TbBrandCucumber,
	},
	{
		name: 'dairy',
		icon: TbMilk,
	},
].filter(Boolean) as Category[];

type CategoryTabsProps = {
	active: boolean;
};
export const CategoryTabs = () => {
	const [selectedTab, setSelectedTab] = useState('fruits');
	return (
		<CustomTabs>
			<TabGroup className="">
				{categoryIcons.map((category) => (
					<Link href={`/categories/${category.name}`} key={category.name}>
						{' '}
						<TabItem
							className={clsx(['tab', selectedTab === category.name ? 'active' : ''])}
							onClick={() => setSelectedTab(category.name)}
						>
							<span className="tab__name">{category.name}</span>
							<category.icon className="tab__icon" />
						</TabItem>
					</Link>
				))}
			</TabGroup>
		</CustomTabs>
	);
};
