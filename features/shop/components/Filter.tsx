import React, { useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';

import { Button } from '@/components/Elements/Button';
import { Drawer } from '@/components/Elements/Drawer';
import { category } from '@/data/categories';
import useDeviceDetect from '@/hooks/useDeviceDetect';
import { useDisclosure } from '@/hooks/useDisclosure';

import { FilterProps } from '../types';

import { FilterContent } from './FilterContent';
import { FilterContainer } from './index.styled';

type Props = {
	addCategory: (value: typeof category[number]) => void;
	removeCategory: (value: typeof category[number]) => void;
	filterValues: FilterProps;
	setPrices: (value: [number, number]) => void;
};

export const Filter = (props: Props) => {
	const { addCategory, removeCategory, filterValues, setPrices } = props;
	const { isOpen, open, close } = useDisclosure();
	const { isMobile } = useDeviceDetect();

	useEffect(() => {
		if (!isMobile) {
			close();
		}
	}, [isMobile]);

	return (
		<FilterContainer>
			<Button
				size="md"
				type="button"
				variant="inverse"
				startIcon={<FaFilter />}
				className="filter-button"
				onClick={open}
			>
				Filter
			</Button>
			<FilterContent
				className="non-mobile"
				addCategory={addCategory}
				removeCategory={removeCategory}
				setPrices={setPrices}
				filterValues={filterValues}
			/>

			<Drawer isOpen={isOpen} close={close} title={'Filters'}>
				<FilterContent
					addCategory={addCategory}
					removeCategory={removeCategory}
					setPrices={setPrices}
					filterValues={filterValues}
				/>
			</Drawer>
		</FilterContainer>
	);
};
