import { BACKEND_API_URL } from 'src/shared/config';

export const requestLogout = () => ({
	url: `${BACKEND_API_URL}/auth/logout`,
	options: {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Origin': 'http://localhost:3000',
		},
		credential: 'include',
	},
	enabled: false,
});
