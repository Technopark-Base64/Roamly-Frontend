import { store } from 'src/app/providers/StoreProvider';
import { mapResponseToEvent } from '../../Event';
import { mapResponseToPlace } from '../../Place';
import { UserRole } from '../../User';
import { ITrip, ITripResponse } from '../model/types/Trip';

export const mapResponseToTrip = (res: ITripResponse): ITrip => {
	const myId = store.getState().currentUserReducer.user?.id ?? 0;
	const places =  res.places.map(mapResponseToPlace);

	return {
		id: res.id,
		name: res.name,
		users: res.users,
		// TODO delete hard owner declaration
		myRole: res.users.find((u) => u.id === myId)?.role ?? UserRole.Owner,
		inviteTokens: {
			readonly: res.id,
			editor: null,
		},
		startTime: new Date(res.start_time),
		endTime: new Date(res.end_time),
		area: mapResponseToPlace(res.area),
		places,
		events: res.events.map((e) => mapResponseToEvent(e, places)),
	};
};
