import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

import { Button } from '../Button';
type DrawerProps = {
	isOpen: boolean;
	close: () => void;
	renderFooter?: React.ReactElement;
	title: string;
	children: React.ReactNode;
};
export const Drawer = (props: DrawerProps) => {
	const { title, children, isOpen, close, renderFooter } = props;
	return (
		<Transition
			show={isOpen}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
			as={Fragment}
		>
			<Dialog
				unmount={false}
				open={isOpen}
				onClose={close}
				className="fixed z-30 inset-0 overflow-y-auto left-0 top-0 h-screen"
			>
				<div className="flex w-3/4 h-screen mobile:w-screen">
					<Dialog.Overlay className="z-40 fixed inset-0 bg-black bg-opacity-30" />
					<div
						className={`z-50 flex flex-col justify-between bg-white w-full
                         max-w-md mobile:max-w-full p-6 overflow-hidden text-left align-middle
                         shadow-xl`}
					>
						<div>
							<Dialog.Title className="font-bold text-2xl md:text-4xl text-blue-400">
								{title}
							</Dialog.Title>

							<Dialog.Description className="overflow-y-auto h-[70vh]">{children}</Dialog.Description>
						</div>

						<div className=" mt-10">
							{renderFooter ? (
								renderFooter
							) : (
								<Button variant="danger" type="button" size="md" onClick={close}>
									Close
								</Button>
							)}
						</div>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
