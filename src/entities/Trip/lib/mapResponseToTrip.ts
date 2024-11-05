import { mapResponseToEvent } from '../../Event';
import { mapResponseToPlace } from '../../Place';
import { ITrip, ITripResponse } from '../model/types/Trip';

export const mapResponseToTrip = (res: ITripResponse): ITrip => {
	const places =  res.places.map(mapResponseToPlace);

	return {
		id: res.id,
		name: res.name,
		users: res.users,
		startTime: new Date(res.start_time),
		endTime: new Date(res.end_time),
		area: mapResponseToPlace(res.area),
		places,
		events: res.events.map((e) => mapResponseToEvent(e, places)),
	};
};
