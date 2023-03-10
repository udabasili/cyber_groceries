import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import colors from '@/constant/colors';
import { header, paragraph } from '@/constant/font';
import AuthMiddleware from '@/middleware/AuthMiddleware';
import { AppContext } from '@/store/appContext';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: 1,
			staleTime: 5 * 1000,
		},
	},
});
export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => storePathValues, [router.asPath]);

	function storePathValues() {
		const storage = globalThis?.sessionStorage;
		if (!storage) return;
		// Set the previous path as the value of the current path.
		const prevPath = storage.getItem('currentPath');
		storage.setItem('prevPath', prevPath as string);
		// Set the current path value by looking at the browser's location object.
		storage.setItem('currentPath', globalThis.location.pathname);
	}

	return (
		<>
			<style jsx global>
				{`
					:root {
						--header: ${header.style.fontFamily};
						--paragraph: ${paragraph.style.fontFamily};
						--primary: ${colors.primary};
						--primary-light: ${colors.primaryLight};
						--secondary: ${colors.secondary};
						--background: ${colors.background};
						--gray: ${colors.gray};
						--white: ${colors.white};
					}
				`}
			</style>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<QueryClientProvider client={queryClient}>
				<AppContext>
					<AuthMiddleware>
						<>
							<Component {...pageProps} />
						</>
					</AuthMiddleware>
				</AppContext>
			</QueryClientProvider>
		</>
	);
}
