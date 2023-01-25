import clsx from 'clsx';

type HeadingProps = {
	children: React.ReactNode;
	className?: string;
};
export const Header1 = ({ children, className = '' }: HeadingProps) => (
	<h1
		className={clsx([
			'mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-header',
			className,
		])}
	>
		{children}
	</h1>
);

export const Header2 = ({ children, className = '' }: HeadingProps) => (
	<h2 className={clsx(['text-4xl font-extrabold dark:text-black font-header', className])}>{children}</h2>
);

export const Header3 = ({ children, className = '' }: HeadingProps) => (
	<h3 className={clsx(['text-3xl font-bold dark:text-black', className])}>{children}</h3>
);

export const Header4 = ({ children, className = '' }: HeadingProps) => (
	<h4 className={clsx(['text-2xl font-bold dark:text-white', className])}>{children}</h4>
);
