import React, { useContext } from 'react';
import { withProtected } from 'routes/withProtectedRoute';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';
import { Context } from '@/store/appContext';

function ProfilePage() {
	const { currentUser } = useContext(Context);

	return (
		<MainLayout title="Profile">
			<CustomPageHeader title="Profile" path="Profile" link="profile" />
			<strong>Email Address:</strong> {currentUser?.email}
			<strong>Name:</strong> {currentUser?.name}
		</MainLayout>
	);
}

export default withProtected(ProfilePage);
