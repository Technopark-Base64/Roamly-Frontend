import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
	id: string,
  name?: string,
	place_id?: string,
	trip_id: string,
  start_time: string,
  end_time: string
}

export const updateEvent = (eventForm: IProps) => ({
	url: `${BACKEND_API_URL}/trip/event/`,
	options: {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(eventForm),
	},
	enabled: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.event,
});
