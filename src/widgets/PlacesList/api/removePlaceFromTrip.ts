import { mapResponseToPlace } from 'src/entities/Place';
import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
  place_id: string,
	trip_id: string,
}

export const removePlaceFromTrip = (req: IProps) => ({
	url: `${BACKEND_API_URL}/trip/${req.trip_id}/place/${req.place_id}`,
	options: {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
	notifyOnError: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.trip.places.map(mapResponseToPlace),
});
