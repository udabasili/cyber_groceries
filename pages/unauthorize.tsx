import React from 'react';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';

export default function UnAuthorized() {
	return (
		<MainLayout title="UnAuthorized">
			<CustomPageHeader title="UnAuthorized" path="UnAuthorized" link="profile" />
		</MainLayout>
	);
}
