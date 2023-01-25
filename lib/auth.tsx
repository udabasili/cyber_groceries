import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import {
	getUser,
	IUserResponse,
	LoginCredentialsDTO,
	loginWithEmailAndPassword,
	RegisterDataDTO,
	registerWithEmailandPassword,
} from '@/features/auth';
import { Context } from '@/store/appContext';
import { storage } from '@/utils/storage';

async function handleUserResponse(data: IUserResponse) {
	const { jwt, user } = data.message;
	if (jwt) {
		storage.set(jwt);
	}
	return user;
}

export async function getCurrentUserFn() {
	if (storage.get()) {
		const response = await getUser();
		const { jwt, user } = response.message;
		return user;
	}
	return null;
}

async function loginFn(data: LoginCredentialsDTO) {
	const response = await loginWithEmailAndPassword(data);
	const user = handleUserResponse(response);
	return user;
}

async function registerFn(data: RegisterDataDTO) {
	const response = await registerWithEmailandPassword(data);
	const user = handleUserResponse(response);
	return user;
}

async function logoutFn() {
	window.location.assign(window.location.origin as unknown as string);
}

export const useRegister = () => {
	const queryClient = useQueryClient();
	const { setCurrentUser } = useContext(Context);

	const { mutate: register, isLoading } = useMutation((data: RegisterDataDTO) => registerFn(data), {
		onSuccess: (response) => {
			setCurrentUser(response);
			queryClient.invalidateQueries('user');
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});
	return {
		isLoading,
		register,
	} as const;
};

export const useGetCurrentUser = () => {
	const { setCurrentUser } = useContext(Context);
	const router = useRouter();

	const { data: currentUser, isLoading } = useQuery({
		queryFn: () => getCurrentUserFn(),
		queryKey: ['user'],
		select: (data) => data,
		enabled: false,
		retry: 1,
		onSuccess: (response) => {
			setCurrentUser(response);
			router.push('/');
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});
	return {
		isLoading,
		currentUser,
	} as const;
};

export const useLogin = () => {
	const queryClient = useQueryClient();
	const { setCurrentUser } = useContext(Context);
	const router = useRouter();

	const { mutate: login, isLoading } = useMutation((data: LoginCredentialsDTO) => loginFn(data), {
		onSuccess: (response) => {
			setCurrentUser(response);
			queryClient.invalidateQueries(['user']);
			router.push('/');
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});
	return {
		isLoading,
		login,
	};
};

export const useLogout = () => {
	const { mutate: logoutUser, isLoading } = useMutation(() => logoutFn(), {
		onSuccess: () => {
			window.location.href = '/auth';
			toast.success('Logged out');
		},
		onError: (error: unknown) => {
			const errorObject = error as AxiosError & Error;
			toast.error((errorObject.response?.data as Error)?.message || errorObject.message);
		},
	});

	return {
		logoutUser,
		isLoading,
	};
};
