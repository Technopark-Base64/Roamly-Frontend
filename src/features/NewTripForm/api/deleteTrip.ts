import { BACKEND_API_URL } from 'src/shared/config';

export const deleteTrip = (id: string) => ({
	url: `${BACKEND_API_URL}/trip/${id}`,
	options: {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
});
