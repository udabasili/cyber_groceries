/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-mixed-spaces-and-tabs */
import { createContext, useContext, useEffect, useReducer } from 'react';

import { AuthUser } from '@/features/auth';
import { CartItem } from '@/types/cart';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '@/utils/cart';
import { cartStorage } from '@/utils/storage';

type State = {
	cart: CartItem[];
	currentUser: AuthUser;
	isAuthenticated: boolean;
};

const initialState = {
	cart: [] as CartItem[],
	currentUser: {} as AuthUser,
	isAuthenticated: false,
	setCurrentUser: (e: AuthUser) => {},
	addItemToCart: (e: CartItem) => {},
	removeItemFromCart: (e: string) => {},
	clearItemFromCart: (e: string) => {},
};

type Action =
	| {
			type: 'SET_CURRENT_USER';
			payload: AuthUser;
	  }
	| {
			type: 'ADD_TO_CART';
			payload: CartItem;
	  }
	| {
			type: 'INITIALIZE_CART';
			payload: CartItem[];
	  }
	| {
			type: 'REMOVE_FROM_CART';
			payload: string;
	  }
	| {
			type: 'CLEAR_FROM_CART';
			payload: string;
	  };

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'SET_CURRENT_USER': {
			return {
				...state,
				currentUser: action.payload,
				isAuthenticated: Object.keys(action.payload).length > 0,
			};
		}
		case 'ADD_TO_CART': {
			return {
				...state,
				cart: addItemToCart(action.payload, state.cart),
			};
		}
		case 'REMOVE_FROM_CART': {
			return {
				...state,
				cart: removeItemFromCart(action.payload, state.cart),
			};
		}
		case 'CLEAR_FROM_CART': {
			return {
				...state,
				cart: clearItemFromCart(action.payload, state.cart),
			};
		}
		case 'INITIALIZE_CART': {
			return {
				...state,
				cart: action.payload,
			};
		}
		default:
			return state;
	}
};

export const Context = createContext(initialState);

type Props = {
	children: React.ReactNode;
};
export const AppContext = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (cartStorage.check()) {
			dispatch({
				type: 'INITIALIZE_CART',
				payload: cartStorage.get(),
			});
		}
	}, []);

	useEffect(() => {
		if (state !== initialState) {
			cartStorage.set(state.cart);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.cart]);

	return (
		<Context.Provider
			value={{
				currentUser: state.currentUser,
				isAuthenticated: state.isAuthenticated,
				cart: state.cart,
				setCurrentUser: (currentUser: AuthUser) =>
					dispatch({
						type: 'SET_CURRENT_USER',
						payload: currentUser,
					}),
				addItemToCart: (item: CartItem) =>
					dispatch({
						type: 'ADD_TO_CART',
						payload: item,
					}),
				removeItemFromCart: (item: string) =>
					dispatch({
						type: 'REMOVE_FROM_CART',
						payload: item,
					}),
				clearItemFromCart: (item: string) =>
					dispatch({
						type: 'CLEAR_FROM_CART',
						payload: item,
					}),
			}}
		>
			{children}
		</Context.Provider>
	);
};
