import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
  area_id: string,
  start_time: string,
  end_time: string
}

export const newTrip = (tripForm: IProps) => ({
	url: `${BACKEND_API_URL}/trip`,
	options: {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credential: 'include',
		body: JSON.stringify(tripForm)
	},
	enabled: false,
});
