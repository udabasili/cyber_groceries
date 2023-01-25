import { apiCall } from '@/lib/axios';

import { IUserResponse } from '../types';

export type RegisterDataDTO = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: 'User' | 'Admin';
};

export const registerWithEmailandPassword = async (data: RegisterDataDTO) => {
	const response = await apiCall.post<IUserResponse>('/auth/register', data);
	return response.data;
};
