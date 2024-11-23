import { mapResponseToTrip } from 'src/entities/Trip';
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
	notifyOnError: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => mapResponseToTrip(body.trip).events,
});