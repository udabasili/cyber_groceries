import Image from 'next/image';
import React from 'react';

import { SectionHeader } from '@/components/Elements/Headings';

import { SponsorLogo, SponsorLogos, SponsorsSection } from './index.styled';

export const Sponsors = () => {
	return (
		<SponsorsSection className="header__seenon-logos">
			<SectionHeader title="Our Partners" />
			<SponsorLogos>
				<SponsorLogo>
					<Image src="/logos/logo-bbc.png" alt="Seen on logo 1" fill />
				</SponsorLogo>
				<SponsorLogo>
					<Image src="/logos/logo-techcrunch.png" alt="Seen on logo 3" fill />
				</SponsorLogo>
				<SponsorLogo>
					<Image src="/logos/logo-forbes.png" alt="Seen on logo 2" fill />
				</SponsorLogo>
				<SponsorLogo>
					<Image src="/logos/logo-bi.png" alt="Seen on logo 4" fill />
				</SponsorLogo>
			</SponsorLogos>
		</SponsorsSection>
	);
};
