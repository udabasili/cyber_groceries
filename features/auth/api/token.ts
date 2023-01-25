import { IUserResponse } from '@/features/auth';
import { apiCall } from '@/lib/axios';

export const refreshAccessTokenFn = async () => {
	const response = await apiCall.get<IUserResponse>('/auth/refresh');
	return response.data;
};
