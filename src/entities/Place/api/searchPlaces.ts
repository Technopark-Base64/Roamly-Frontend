import { TCircle } from 'src/widgets/MapWidget';
import { BACKEND_API_URL } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';
import { sortPlacesByRating } from '../lib/sortPlacesByRating';

export const searchPlaces = (place: string, circle: TCircle) => ({
	url: `${BACKEND_API_URL}/place?name=${place}&lat=${circle.center.lat}&lng=${circle.center.lng}&radius=${circle.radius}`,
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
