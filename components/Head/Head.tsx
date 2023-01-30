import Head from 'next/head';
import React from 'react';

type CustomHeadProps = {
	title: string;
};

export const CustomHead = ({ title }: CustomHeadProps) => {
	return (
		<Head>
			<title>{` ${title} | Cyber Groceries `}</title>
			<meta name="description" content="Number One  Grocery Store" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/fav.ico" />
		</Head>
	);
};
