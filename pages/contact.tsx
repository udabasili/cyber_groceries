import dynamic from 'next/dynamic';
import React from 'react';

import { CustomPageHeader } from '@/components/Elements/Headings';
import { MainLayout } from '@/components/Layout';
import { ContactMain, ContactList, ContactForm } from '@/features/contact';

export default function Contact() {
	const MapWithNoSSR = dynamic(() => import('../features/contact/components/ContactMap'), {
		ssr: false,
	});
	return (
		<MainLayout title="Contact">
			<CustomPageHeader title="Contact" path="contact" link="contact" />
			<ContactMain>
				<ContactList />
				<MapWithNoSSR />
				<ContactForm />
			</ContactMain>
		</MainLayout>
	);
}
