import { BACKEND_API_URL } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';

export const searchArea = (region: string) => ({
	url: `${BACKEND_API_URL}/place?name=${region}&type=locality`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.results.map(mapResponseToPlace),
});
