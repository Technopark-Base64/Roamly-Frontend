import { GOOGLE_API_KEY } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';
import { IPlace } from '../model/types';

export const searchPlaces = (place: string, region?: IPlace, ) => ({
	url: requestUrl(place, region),
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
	},
	enabled: false,
	mapFunction: (body: any) => body.results.map(mapResponseToPlace),
});

const requestUrl = (place: string, region?: IPlace) => {
	return `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${place}
	${region && `&location=${region?.location.lat},${region?.location.lng}
	&radius=20000`}
	&fields=formatted_address,name,rating,geometry
	&key=${GOOGLE_API_KEY}`;
};

