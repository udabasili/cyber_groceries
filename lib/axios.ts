import axios, { AxiosRequestConfig } from 'axios';

import { refreshAccessTokenFn } from '@/features/auth';
import { storage } from '@/utils/storage';

export const apiCall = axios.create({
	baseURL: '/api/',
	headers: {
		'content-type': 'application/json',
	},
	withCredentials: true,
});

apiCall.interceptors.request.use((config) => {
	const token = storage.get();
	if (token && config.headers) {
		config.headers.authorization = `Bearer ${token}`;
	}

	return config;
});

apiCall.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		const errName = error.response?.data?.name as string;
		if (errName && errName.includes('JWTExpired') && !originalRequest._retry) {
			originalRequest._retry = true;
			const response = await refreshAccessTokenFn();
			const { jwt } = response.message;
			if (jwt) {
				storage.set(jwt);
			}
			return apiCall(originalRequest);
		}
		return Promise.reject(error);
	}
);
