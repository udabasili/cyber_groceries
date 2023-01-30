import React from 'react';

import { Button } from '@/components/Elements/Button';
import { Header3, Header4 } from '@/components/Elements/Headings';

import { Col_1_of_2, SubscribeSection } from './index.styled';

export const Subscribe = () => {
	return (
		<SubscribeSection>
			<Col_1_of_2 className="p-4 my-8 lg:p-8 flex flex-col">
				<Header4 className="mb-2">We got your back</Header4>
				<Header3 className="u-margin-bottom-small">Join our newsletter and get your orders</Header3>
				<p className="u-margin-bottom-small">
					Do you want to get notified when a new component is added to Flowbite? Sign up for our newsletter
					and you&apos;ll be among the first to find out about new features, components, versions, and tools.
				</p>
				<form>
					<div className="flex">
						<span className="inline-flex items-center px-3 text-sm text-white bg-black rounded-l-md">
							@
						</span>
						<input
							type="email"
							id="email"
							className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-90 block flex-1 min-w-0 w-full text-sm p-2.5 "
							placeholder="Enter you email here..."
						/>
						<Button variant="dark" size="md" type="button" className="ml-3">
							Subscribe
						</Button>
					</div>
				</form>
			</Col_1_of_2>
			<Col_1_of_2 className="col-1-of-2--right"></Col_1_of_2>
		</SubscribeSection>
	);
};
