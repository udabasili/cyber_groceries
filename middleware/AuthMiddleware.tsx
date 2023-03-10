import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';

import { LoadingScreen } from '@/components/Elements/LoadingScreen';
import { AuthUser } from '@/features/auth';
import { getCurrentUserFn } from '@/lib/auth';
import { Context } from '@/store/appContext';

type AuthMiddlewareProps = {
	children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
	const [cookies] = useCookies(['logged_in']);
	const { setCurrentUser } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!cookies.logged_in) {
			setLoading(false);
			setCurrentUser({} as AuthUser);
		}
	}, []);

	useQuery(['authUser'], () => getCurrentUserFn(), {
		select: (data) => data,
		onSuccess: (response) => {
			setLoading(false);
			console.log(response, 1);
			setCurrentUser(response ? response : {});
		},
		onError: () => {
			setLoading(false);
			console.log('response', 2);
			setCurrentUser({} as AuthUser);
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retry: false,
	});

	if (loading) {
		return <LoadingScreen />;
	}

	return children;
};

export default AuthMiddleware;
