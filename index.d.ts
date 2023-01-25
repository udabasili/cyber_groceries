/* eslint-disable no-var */
import { AuthUser } from './features/auth';

export declare global {
	var mongoose: {
		conn: typeof import('mongoose') | null;
		promise: Promise<typeof import('mongoose')> | null;
	};
}

declare module 'next' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface NextApiRequest {
		currentUser: AuthUser;
	}
}
