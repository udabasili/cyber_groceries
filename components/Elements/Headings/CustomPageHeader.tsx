import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { CustomHeader } from './index.style';

type CustomPageHeaderProps = {
	title: string;
	link?: string;
	path: string;
};

export const CustomPageHeader = ({ title, link, path }: CustomPageHeaderProps) => {
	const router = useRouter();

	return (
		<CustomHeader>
			<div className="content">
				<h2 className="title font-custom">{title}</h2>
				<ul className="list">
					<li className="item">
						<Link href="/" className="link ">
							Home
						</Link>
					</li>
					{link &&
						link.split('*').map((d, index) => (
							<li className="item" key={index}>
								<Link
									href={`/${path}`}
									className={`${router.pathname === `/${path}` ? 'active' : ''} link`}
								>
									{d}
								</Link>
							</li>
						))}
				</ul>
			</div>
		</CustomHeader>
	);
};
