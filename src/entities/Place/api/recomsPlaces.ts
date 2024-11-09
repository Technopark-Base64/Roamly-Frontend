import { TCircle } from 'src/widgets/MapWidget';
import { BACKEND_API_URL } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';

const RECOMS_CHUNK_SIZE = 20;

export const recomsPlaces = (types: string[], circle: TCircle) => ({
	url: `${BACKEND_API_URL}/place/recomendations
	?types=${types.join(',')}&lat=${circle.center.lat}&lng=${circle.center.lng}
	&radius=${circle.radius}&max_places=${RECOMS_CHUNK_SIZE}`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.map(mapResponseToPlace),
});
