import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout';
import { RouteAdmin } from '@/components/Sidebar/navigationData';
import { AdminDashboard, Customers, Dashboard, Orders, Products } from '@/features/admin';
import { withAuthorized } from '@/lib/authorization';

type ComponentsProps = {
	[k in RouteAdmin]: React.FC;
};

const COMPONENT_MAP: ComponentsProps = {
	dashboard: Dashboard,
	customers: Customers,
	orders: Orders,
	products: Products,
};

function AdminPage() {
	const [currentRoute, setCurrentRoute] = useState<RouteAdmin>('dashboard');

	const Component = COMPONENT_MAP[currentRoute];
	return (
		<MainLayout title="Admin">
			<AdminDashboard changeRoute={setCurrentRoute} currentRoute={currentRoute}>
				<div className="flex flex-1">
					<Component />
				</div>
			</AdminDashboard>
		</MainLayout>
	);
}

export default withAuthorized(AdminPage);
