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
	mapFunction: (body: any) => body.results.map(mapResponseToPlace),
});

const requestUrl = (region: string) => {
	return `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${region}
	&type=locality
	&fields=formatted_address,name,rating,geometry
	&key=${GOOGLE_API_KEY}`;
};
