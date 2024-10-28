import { BACKEND_API_URL } from 'src/shared/config';

export const requestCheckAuth = () => ({
	url: `${BACKEND_API_URL}/auth/check`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'Origin': 'http://localhost:3000',
		},
		credentials: 'include',
	},
	enabled: false,
});
