import { BACKEND_API_URL } from 'src/shared/config';

export const requestLogout = () => ({
	url: `${BACKEND_API_URL}/auth/logout`,
	options: {
		method: 'POST',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
	notifyOnError: true,
});
