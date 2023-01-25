/* eslint-disable no-mixed-spaces-and-tabs */
import { useReducer } from 'react';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';
import { category } from '@/data/categories';
import { ShopMain, Sort, Filter, PaginatedProducts, FilterProps } from '@/features/shop';

const initialState = {
	prices: [20, 50] as [number, number],
	categories: [] as Array<typeof category[number]>,
};

type Action =
	| {
			type: 'price';
			payload: [number, number];
	  }
	| {
			type: 'addCategory';
			payload: typeof category[number];
	  }
	| {
			type: 'removeCategory';
			payload: typeof category[number];
	  };

const reducer = (state: FilterProps, action: Action) => {
	switch (action.type) {
		case 'addCategory':
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		case 'removeCategory': {
			const removeCategory = state.categories.filter((category) => category !== action.payload);
			return {
				...state,
				categories: [...removeCategory],
			};
		}
		case 'price': {
			return {
				...state,
				prices: action.payload,
			};
		}

		default:
			return state;
	}
};

export default function Products() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addCategory = (value: typeof category[number]) => {
		dispatch({
			type: 'addCategory',
			payload: value,
		});
	};

	const removeCategory = (value: typeof category[number]) => {
		dispatch({
			type: 'removeCategory',
			payload: value,
		});
	};

	const setPrices = (value: [number, number]) => {
		dispatch({
			type: 'price',
			payload: value,
		});
	};

	return (
		<MainLayout title={'Products'}>
			<CustomPageHeader title="Products" path="products" link="products" />
			<ShopMain>
				<Sort />
				<Filter
					addCategory={addCategory}
					removeCategory={removeCategory}
					filterValues={state}
					setPrices={setPrices}
				/>
				<PaginatedProducts itemsPerPage={10} filter={state} />
			</ShopMain>
		</MainLayout>
	);
}
