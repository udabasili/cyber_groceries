import Image from 'next/image';
import React from 'react';

import { Header3, SectionHeader } from '@/components/Elements/Headings';

import { MissionImage, MissionContent, Col } from './index.styled';

export const Mission = () => {
	return (
		<>
			<MissionImage>
				<Image src="/about/image.webp" alt="about-main" fill sizes="(min-width: 36rem ) 33vw, 100vw" />
			</MissionImage>
			<SectionHeader title="Our Mission" />
			<MissionContent>
				<Col>
					<Header3>Success</Header3>
					<p className="paragraph">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod ultricies ultrices. In
						nunc neque, consectetur at mauris id, tincidunt feugiat lorem. Sed at lacus massa
					</p>
				</Col>
				<Col>
					<Header3>Excellence</Header3>
					<p className="paragraph">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod ultricies ultrices. In
						nunc neque, consectetur at mauris id, tincidunt feugiat lorem. Sed at lacus massa
					</p>
				</Col>
				<Col>
					<Header3>Greatness</Header3>
					<p className="paragraph">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod ultricies ultrices. In
						nunc neque, consectetur at mauris id, tincidunt feugiat lorem. Sed at lacus massa
					</p>
				</Col>
				<Col>
					<Header3>New Beginnings</Header3>
					<p className="paragraph">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod ultricies ultrices. In
						nunc neque, consectetur at mauris id, tincidunt feugiat lorem. Sed at lacus massa
					</p>
				</Col>
			</MissionContent>
		</>
	);
};
