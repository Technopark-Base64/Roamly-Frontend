import { IPlace } from '../../Place';
import { IEvent, IEventResponse } from '../model/types';

export const mapResponseToEvent = (event: IEventResponse, places: IPlace[]): IEvent => {
	const place = places.find((pl: IPlace) => pl.placeId === event.place_id);

	return {
		id: event.id,
		name: event.name,
		startTime: new Date(event.start_time),
		endTime: new Date(event.end_time),
		place,
	};
};
