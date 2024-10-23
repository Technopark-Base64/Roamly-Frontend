import { mapResponseToPlace } from '../../Place';
import { ITrip, ITripResponse } from '../model/types/Trip';

export const mapResponseToTrip = (res: ITripResponse): ITrip => ({
	id: res.id,
	users: res.users,
	startTime: new Date(res.start_time),
	endTime: new Date(res.end_time),
	area: mapResponseToPlace(res.area),
	places: res.places.map(mapResponseToPlace),
	events: res.events,
});
