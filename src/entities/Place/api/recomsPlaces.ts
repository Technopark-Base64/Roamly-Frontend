import { BACKEND_API_URL } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';
import { sortPlacesByRating } from '../lib/sortPlacesByRating';
import { IPlace } from '../model/types';

export const recomsPlaces = (type: string, region?: IPlace, ) => ({
	url: `${BACKEND_API_URL}/place/recomendations?types=${type}&lat=${region?.location.lat}&lng=${region?.location.lng}`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.map(mapResponseToPlace).sort(sortPlacesByRating),
});
