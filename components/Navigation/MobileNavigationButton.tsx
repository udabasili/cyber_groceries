import React, { useRef } from 'react';

import { MobileNavInput, MobileNavButton } from './index.styled';

export type Ref = HTMLInputElement;

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const MobileNav = React.forwardRef<Ref, Props>((props, ref) => {
	return (
		<>
			<MobileNavInput ref={ref} className="navigation-input" type="checkbox" id="navigation-toggle" />
			<MobileNavButton className="navigation-button" htmlFor="navigation-toggle">
				<span className="navigation-icon"></span>
			</MobileNavButton>
		</>
	);
});

MobileNav.displayName = 'MobileNav';
