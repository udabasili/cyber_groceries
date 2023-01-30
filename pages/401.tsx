/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';

export default function FourZeroOne() {
	return (
		<div className="w-screen">
			<div className="px-4 lg:py-12">
				<div className="flex justify-center items-center">
					<div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
						<h1 className="font-bold text-primary text-9xl">401</h1>
						<p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
							<span className="text-red-500">UnAuthorized!</span>
						</p>
						<p className="mb-8 text-center text-gray-500 md:text-lg">Access not allowed</p>
						<Link href="/" className="px-6 py-2 text-sm font-semibold text-primary bg-blue-100">
							Go home
						</Link>
					</div>
					<div className="mt-4 ml-11">
						<Image
							src="/Broken Clock-big.png"
							alt="img"
							className="object-cover"
							width={200}
							height={200}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
