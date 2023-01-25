import Image from 'next/image';
import React from 'react';

import { ImageText, ImageWrapper, sizes, Wrapper } from './index.styled';

type AvatarProps = {
	imageUrl: string;
	username: string;
	size: keyof typeof sizes;
};

export const Avatar = ({ imageUrl, username, size }: AvatarProps) => (
	<Wrapper size={size} className="avatar">
		<ImageWrapper size={size}>
			<Image src={imageUrl} alt={username} fill />
		</ImageWrapper>

		<ImageText size={size}>{username}</ImageText>
	</Wrapper>
);
