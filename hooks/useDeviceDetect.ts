import debounce from 'lodash/debounce';
import React, { useEffect } from 'react';

export default function useDeviceDetect() {
	const [isMobile, setMobile] = React.useState(false);

	React.useEffect(() => {
		const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
		const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
		setMobile(mobile);
	}, []);

	useEffect(() => {
		const updateSize = (): void => {
			setMobile(window.innerWidth < 900);
		};
		window.addEventListener('resize', updateSize);
		return (): void => window.removeEventListener('resize', updateSize);
	}, []);
	console.log(isMobile);

	return { isMobile };
}
