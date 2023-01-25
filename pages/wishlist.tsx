import React, { useContext } from 'react';
import { withProtected } from 'routes/withProtectedRoute';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';
import { WishlistTable } from '@/features/wishList';
import { Context } from '@/store/appContext';

function WishList() {
	const { currentUser } = useContext(Context);

	return (
		<MainLayout title="My Wish List">
			<CustomPageHeader title="My Wish List" path="wishlist" link="wishlist" />
			<WishlistTable />
		</MainLayout>
	);
}

export default withProtected(WishList);
