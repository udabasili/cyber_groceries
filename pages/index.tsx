import { ContentLayout, MainLayout } from '@/components/Layout';
import { Categories, Header, HotOffers, SampleProducts, Subscribe } from '@/features/home';

export default function Home() {
	return (
		<MainLayout title={'Home'}>
			<Header />
			<HotOffers />
			<Categories />
			<Subscribe />
			<SampleProducts />
		</MainLayout>
	);
}
