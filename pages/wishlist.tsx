import React from 'react';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';
import { WishlistTable } from '@/features/wishList';
import { withProtected } from '@/routes/withProtectedRoute';

function WishList() {
	return (
		<MainLayout title="My Wish List">
			<CustomPageHeader title="My Wish List" path="wishlist" link="wishlist" />
			<WishlistTable />
		</MainLayout>
	);
}

export default withProtected(WishList);
