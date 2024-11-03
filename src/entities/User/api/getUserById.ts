import { BACKEND_API_URL } from 'src/shared/config';

export const getUserById = (id: number) => ({
	url: `${BACKEND_API_URL}/user/${id}`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.user,
});
