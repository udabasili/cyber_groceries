import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/Elements/Button';
import { Header1 } from '@/components/Elements/Headings';

import { slideData } from '../data/slideData';

import {
	SlidePreviewContainer,
	Slide,
	PreviewItem,
	SlideContent,
	SlideImage,
	SlideShowContainer,
	SlideControllerContainer,
} from './index.styled';

type SlidePreviewProps = {
	setCurrentSlide: (e: number) => void;
	currentSlide: number;
};

const SlidePreview = ({ setCurrentSlide, currentSlide }: SlidePreviewProps) => {
	return (
		<SlidePreviewContainer>
			{slideData.map((slide, index) => (
				<PreviewItem
					className={clsx([currentSlide === index ? 'active' : ''])}
					key={slide.name + index}
					data-cy={`button-${index}`}
					onClick={() => setCurrentSlide(index)}
				>
					{' '}
					<Image
						src={slide.image}
						alt={slide.name}
						fill
						sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
					/>
				</PreviewItem>
			))}
		</SlidePreviewContainer>
	);
};

type SlideControllerProps = {
	setCurrentSlide: (e: number) => void;
	currentSlide: number;
};

const SlideController = ({ currentSlide, setCurrentSlide }: SlideControllerProps) => {
	return (
		<SlideControllerContainer>
			<span
				className={clsx(['dot', currentSlide === 0 ? 'active' : ''])}
				onClick={() => setCurrentSlide(0)}
				role="button"
				tabIndex={-1}
				onKeyUp={() => (f: any) => f}
			></span>
			<span
				className={clsx(['dot', currentSlide === 1 ? 'active' : ''])}
				onClick={() => setCurrentSlide(1)}
				role="button"
				tabIndex={-1}
				onKeyUp={() => (f: any) => f}
			></span>
			<span
				className={clsx(['dot', currentSlide === 2 ? 'active' : ''])}
				onClick={() => setCurrentSlide(2)}
				role="button"
				tabIndex={-1}
				onKeyUp={() => (f: any) => f}
			></span>
		</SlideControllerContainer>
	);
};
export const SlideShow = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<SlideShowContainer>
			{slideData.map((slide, index) => (
				<Slide
					key={slide.name + index}
					className={clsx(['fade slide', currentSlide === index ? 'active' : ''])}
					data-cy={`slide-${index}`}
				>
					<SlideContent>
						<div className="w-1/2 flex flex-col">
							<Header1 className="u-margin-bottom-small ">Checkout our weekend prices</Header1>
							<p className="mb-6 text-gray-500 ">
								Here at Flowbite we focus on markets where technology, innovation, and capital can
								unlock long-term value and drive economic growth.
							</p>
							<Link passHref href="products">
								<Button size="md" variant="primary" type="button" className="self-start">
									See More
								</Button>
							</Link>
						</div>
					</SlideContent>
					<SlideImage>
						<Image
							src={slide.image}
							alt={slide.name}
							fill
							sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
						/>
					</SlideImage>
				</Slide>
			))}
			<SlidePreview setCurrentSlide={setCurrentSlide} currentSlide={currentSlide} />
			<SlideController setCurrentSlide={setCurrentSlide} currentSlide={currentSlide} />
		</SlideShowContainer>
	);
};
