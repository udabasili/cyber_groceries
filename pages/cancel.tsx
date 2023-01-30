import Link from 'next/link';
import { FcCancel } from 'react-icons/fc';

import { Header2 } from '@/components/Elements/Headings';

export default function Cancel() {
	return (
		<div
			className="
    			flex
				items-center
				justify-center
				w-screen
				h-screen
				bg-gradient-to-r
				from-primaryLight
				to-primary
			"
		>
			<div className="px-40 py-20 bg-white rounded-md shadow-xl">
				<div className="flex flex-col items-center">
					<FcCancel size="3rem" />
					<Header2 className="mb-2 md:text-3xl">
						<span className="text-green-400">Payment failed</span>
					</Header2>

					<p className="mb-8 text-center text-gray-500 md:text-lg">Error occurred during payment</p>

					<Link href="/" passHref legacyBehavior>
						<p className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"> Go home</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
