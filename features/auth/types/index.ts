export type AuthUser = {
	_id: string;
	name: string;
	email: string;
	password: string;
	role: 'User' | 'Admin';
};

export type IUserResponse = {
	message: {
		user: AuthUser;
		jwt: string;
	};
	success: boolean;
};
