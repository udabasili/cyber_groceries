import React from 'react';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';
import { AboutMain, Mission, Reviews, Sponsors, Values } from '@/features/about';

export default function About() {
	return (
		<MainLayout title="About">
			<CustomPageHeader title="About" path="about" link="about" />
			<AboutMain>
				<Mission />
				<Values />
				<Reviews />
				<Sponsors />
			</AboutMain>
		</MainLayout>
	);
}
