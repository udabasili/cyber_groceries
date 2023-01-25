import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

import { LoadingScreen } from '@/components/Elements/LoadingScreen';
import { Context } from '@/store/appContext';

import { getCurrentUserFn } from './auth';

type AuthProps = {
	allowedRoles: string[];
	children: React.ReactNode;
};

export const Authorization = ({ allowedRoles, children }: AuthProps) => {
	const loginCookie = getCookie('logged_in');
	const { isAuthenticated, setCurrentUser } = useContext(Context);
	const router = useRouter();

	return isAuthenticated && children;
};
