import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
	id: string,
  area_id: string,
  start_time: string,
  end_time: string
}

export const updateTrip = (tripForm: IProps) => ({
	url: `${BACKEND_API_URL}/trip/`,
	options: {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(tripForm)
	},
	enabled: false,
});