import React from 'react';

import { Header3 } from '@/components/Elements/Headings';

import { Col, ContactListSection, Row } from './index.styled';

export const ContactList = () => {
	return (
		<ContactListSection>
			<Row>
				<Col>
					<Header3>Address</Header3>
					<p className="paragraph">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod ultricies ultrices. In
						nunc neque, consectetur at mauris id, tincidunt feugiat lorem. Sed at lacus massa
					</p>
				</Col>
				<Col>
					<Header3>Phone</Header3>
					<div className="paragraph">
						<span>+1-800-123-45-67</span>
						<span>+1-800-123-45-67</span>
					</div>
				</Col>
				<Col>
					<Header3>E-mail</Header3>
					<div className="paragraph">
						<span>sales@naturally.com</span>
						<span>sales@naturally.com</span>
					</div>
				</Col>
				<Col>
					<Header3>Working Hours</Header3>
					<div className="paragraph">
						<span>Monday 09:00 AM</span>
						<span> Friday 05:00 PM</span>
					</div>
				</Col>
			</Row>
		</ContactListSection>
	);
};
