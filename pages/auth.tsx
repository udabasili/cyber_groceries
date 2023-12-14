import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

import { MainLayout } from '@/components/Layout';
import { AuthContainer, AuthContent, Login, Register } from '@/features/auth';

type Props = {
	onSuccess: () => void;
	setAuthStateFn: Dispatch<SetStateAction<'login' | 'register'>>;
};

type ComponentMapProps = Record<string, React.FC<Props>>;
const ComponentMap: ComponentMapProps = {
	login: Login,
	register: Register,
};

export default function Auth() {
	const [authState, setAuthState] = useState<'login' | 'register'>('login');

	const Component = ComponentMap[authState];

	function onSuccesFunc() {
		return;
	}

	return (
		<MainLayout title={'Auth'}>
			<AuthContainer>
				<AuthContent>
					<div className="mb-6 flex self-center">
						<Image
							src="/organic food.svg"
							alt="organic food logo"
							width={40}
							height={40}
							className="mr-2"
						/>
						<span className="self-center font-header whitespace-nowrap text-primary text-xl">
							Cyber Groceries
						</span>
					</div>
					<Component onSuccess={onSuccesFunc} setAuthStateFn={setAuthState} />
				</AuthContent>
			</AuthContainer>
		</MainLayout>
	);
}
