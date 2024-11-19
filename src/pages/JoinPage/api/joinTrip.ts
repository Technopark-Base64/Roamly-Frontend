import { BACKEND_API_URL } from 'src/shared/config';

export const joinTrip = (token: string) => ({
	url: `${BACKEND_API_URL}/trip/join/${token}`,
	options: {
		method: 'POST',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: true,
});
