/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

export default function FourOhFour() {
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
					<h1 className="font-bold text-primary text-9xl">404</h1>

					<h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
						<span className="text-red-500">Oops!</span> Page not found
					</h6>

					<p className="mb-8 text-center text-gray-500 md:text-lg">
						The page you&apos;re looking for doesn&apos;t exist.
					</p>

					<Link href="/" passHref legacyBehavior>
						<a className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"> Go home</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
