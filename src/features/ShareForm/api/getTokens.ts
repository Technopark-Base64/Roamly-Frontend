import { BACKEND_API_URL } from 'src/shared/config';
import { mapTokensResponseToITokens } from '../lib/mapTokensResponseToITokens';

export const getTokens = (tripId: string) => ({
	url: `${BACKEND_API_URL}/trip/${tripId}/invite`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => mapTokensResponseToITokens(body),
});
