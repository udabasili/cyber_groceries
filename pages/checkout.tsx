import { NextPage } from 'next';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';
import { Checkout } from '@/features/checkout';
import { withProtected } from '@/routes/withProtectedRoute';

const CheckoutPage: NextPage = () => {
	return (
		<MainLayout title="Checkout">
			<CustomPageHeader title="Checkout" path="checkout" link="checkout" />
			<Checkout />
		</MainLayout>
	);
};

export default withProtected(CheckoutPage);
