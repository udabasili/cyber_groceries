import React from 'react';

import { Avatar } from '@/components/Elements/Avatar';
import { SectionHeader } from '@/components/Elements/Headings';

import { ReviewCard, ReviewsList, ReviewsSection } from './index.styled';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Review = () => (
	<ReviewCard>
		<p className="paragraph u-margin-bottom-medium">
			&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod ultricies ultrices. In nunc
			neque, consectetur at mauris id, tincidunt feugiat lorem. Sed at lacus massa. Nam ultricies sapien ut
			vehicula ultrices. Vestibulum mattis luctus pharetra. In ullamcorper nec augue eget egestas. Maecenas
			ullamcorper magna eu quam malesuada&quot;
		</p>
		<Avatar imageUrl="/about/avatar.webp" username="Abott" size="sm" />
	</ReviewCard>
);

export const Reviews = () => {
	const reviews = new Array(5).fill(1);
	return (
		<ReviewsSection>
			{' '}
			<SectionHeader title="Testimonials" subText="Why they love us" />
			<ReviewsList>
				{reviews.map((_, index) => (
					<Review key={index} />
				))}
			</ReviewsList>
		</ReviewsSection>
	);
};
