import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { LoadingScreen } from '@/components/Elements/LoadingScreen';
import { Context } from '@/store/appContext';

export enum ROLES {
	Admin = 'Admin',
	User = 'User',
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {};

export const useAuthorization = () => {
	const { currentUser, isAuthenticated } = useContext(Context);

	const checkAccess = React.useCallback(
		({ allowedRoles }: { allowedRoles: RoleTypes }) => {
			if (allowedRoles && allowedRoles.length > 0) {
				return allowedRoles?.includes(currentUser.role);
			}
			return true;
		},
		[currentUser.role]
	);

	return { checkAccess, role: currentUser.role };
};

type DefaultProps = {
	[x: string]: unknown;
};

export function withAuthorized<T extends DefaultProps>(Component: NextPage<T>) {
	return function WithAuthorized(props: T) {
		const router = useRouter();
		const { checkAccess } = useAuthorization();
		const { isAuthenticated } = useContext(Context);
		const [isLoading, setLoading] = useState(!isAuthenticated);

		useEffect(() => {
			if (!checkAccess({ allowedRoles: ROLES.Admin })) {
				router.push('/401');
				return;
			}
			setLoading(false);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isAuthenticated]);

		if (isLoading) {
			return <LoadingScreen />;
		}
		return checkAccess({ allowedRoles: ROLES.Admin }) && <Component {...props} />;
	};
}
