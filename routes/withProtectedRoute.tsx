import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { LoadingScreen } from '@/components/Elements/LoadingScreen';
import { AuthUser } from '@/features/auth';
import { Context } from '@/store/appContext';

type DefaultProps = {
	[x: string]: unknown;
};

export function withProtected<T extends DefaultProps>(Component: NextPage<T>) {
	return function WithProtected(props: T) {
		const router = useRouter();
		const { isAuthenticated } = useContext(Context);
		const [isLoading, setLoading] = useState(!isAuthenticated);

		useEffect(() => {
			if (!isAuthenticated) {
				router.push('/auth');
				return;
			}
			setLoading(false);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isAuthenticated]);

		if (isLoading) {
			return <LoadingScreen />;
		}
		return <Component {...props} />;
	};
}
