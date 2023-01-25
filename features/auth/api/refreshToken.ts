import { apiCall } from '@/lib/axios';

import { IUserResponse } from '../types';

export const refreshAccessTokenFn = async () => {
	const response = await apiCall.get<IUserResponse>('/auth/refresh');
	return response.data;
};
