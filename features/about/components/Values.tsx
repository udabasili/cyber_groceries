import React from 'react';

import { Header3, SectionHeader } from '@/components/Elements/Headings';

import { Col, ValuesContent, ValuesSection } from './index.styled';

export const Values = () => {
	return (
		<ValuesSection>
			<SectionHeader title="Our Values as a Company" className="header" />
			<ValuesContent>
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
			</ValuesContent>
		</ValuesSection>
	);
};
