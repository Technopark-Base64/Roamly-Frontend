import { IPlaceResponse, mapResponseToPlace } from '../../Place';
import { IEvent, IEventResponse } from '../model/types';

export const mapResponseToEvents = (events: IEventResponse[], places: IPlaceResponse[]): IEvent[] => {
	return events.map((event) => {
		const place = places.find((pl: IPlaceResponse) => pl.place_id === event.place_id);

		return {
			id: event.id,
			name: event.name,
			startTime: new Date(event.start_time),
			endTime: new Date(event.end_time),
			place: place && mapResponseToPlace(place),
		};
	});
};
