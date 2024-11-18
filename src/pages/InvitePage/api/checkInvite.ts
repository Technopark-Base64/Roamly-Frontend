import { BACKEND_API_URL } from 'src/shared/config';

export const checkInvite = (token: string) => ({
	url: `${BACKEND_API_URL}/trip/${token}`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: true,
});
