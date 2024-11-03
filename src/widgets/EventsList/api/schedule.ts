import { mapResponseToEvents } from 'src/entities/Event';
import { BACKEND_API_URL } from 'src/shared/config';

export const getSchedule = (id: string) => ({
	url: `${BACKEND_API_URL}/trip/${id}/schedule`,
	options: {
		method: 'POST',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => mapResponseToEvents(body.trip.events, body.trip.places),
});