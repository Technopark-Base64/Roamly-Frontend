import { mapResponseToPlace } from 'src/entities/Place';
import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
  place_id: string,
	trip_id: string,
}

export const addPlaceToTrip = (req: IProps) => ({
	url: `${BACKEND_API_URL}/trip/place/`,
	options: {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(req)
	},
	enabled: false,
	notifyOnError: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.trip.places.map(mapResponseToPlace),
});
