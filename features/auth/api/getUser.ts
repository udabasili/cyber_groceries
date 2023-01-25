import { apiCall } from '@/lib/axios';

export const getUser = async () => {
	const response = await apiCall.get(`/auth/me`);
	return response.data;
};
