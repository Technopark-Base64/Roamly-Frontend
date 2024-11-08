import { BACKEND_API_URL } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';
import { sortPlacesByRating } from '../lib/sortPlacesByRating';
import { IPlace } from '../model/types';

export const searchPlaces = (place: string, region?: IPlace, ) => ({
	url: `${BACKEND_API_URL}/place?name=${place}&lat=${region?.location.lat}&lng=${region?.location.lng}`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.results.map(mapResponseToPlace).sort(sortPlacesByRating),
});
