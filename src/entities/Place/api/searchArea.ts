import { GOOGLE_API_KEY } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';

export const searchArea = (region: string) => ({
	url: requestUrl(region),
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
	},
	enabled: false,
	useProxy: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.results.map(mapResponseToPlace),
});

const requestUrl = (region: string) => {
	return `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${region}
	&type=locality
	&fields=formatted_address,name,rating,geometry
	&key=${GOOGLE_API_KEY}`;
};
