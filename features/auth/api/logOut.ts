import { apiCall } from '@/lib/axios';

export const logOut = async () => {
	const response = await apiCall.get('/auth/logout');
	return response.data;
};
