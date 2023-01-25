import { apiCall } from '@/lib/axios';

import { IUserResponse } from '../types';

export type LoginCredentialsDTO = {
	email: string;
	password: string;
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO) => {
	const response = await apiCall.post<IUserResponse>('/auth/login', data);
	return response.data;
};
