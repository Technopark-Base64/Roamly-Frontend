import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
  place_id: string,
	trip_id: string,
}

export const addPlaceToTrip = (req: IProps) => ({
	url: `${BACKEND_API_URL}/trip/place`,
	options: {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credential: 'include',
		body: JSON.stringify(req)
	},
	enabled: false,
});
