import { mapResponseToTrip } from 'src/entities/Trip';
import { BACKEND_API_URL } from 'src/shared/config';

export const getTrips = () => ({
	url: `${BACKEND_API_URL}/trip/`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.trips.map(mapResponseToTrip),
});
