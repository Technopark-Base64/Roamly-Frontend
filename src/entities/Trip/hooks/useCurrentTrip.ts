import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/app/providers/StoreProvider';
import { useMapWidget } from 'src/widgets/MapWidget';
import { IEvent } from '../../Event';
import { IPlace } from '../../Place';
import { IUser, UserRole } from '../../User';
import { ITrip } from '../index';
import { setTrip, setTripPlaces, setTripEvents, clearTrip, setTripUsers, setTripTokens } from '../lib/slices/CurrentTripStorage';
import { getCurrentTrip } from '../model/selectors/getCurrentTrip';
import { ITokens } from '../model/types/Trip';


export const useCurrentTrip = () => {
	const currentTrip = useSelector(getCurrentTrip);
	const inviteTokens: ITokens = currentTrip ? currentTrip.inviteTokens : {
		readonly: '',
		editor: '',
	};
	const { setView, clearMap } = useMapWidget();
	const dispatch = useDispatch<AppDispatch>();

	const isOwner = !!currentTrip && currentTrip.myRole === UserRole.Owner;
	const isEditor = !!currentTrip && currentTrip.myRole === UserRole.Editor;
	const isReadonly = currentTrip ? currentTrip.myRole === UserRole.Readonly : true;

	const setCurrentTrip = (trip: ITrip | null) => {
		if (trip) {
			dispatch(setTrip({
				...trip,
				startTime: trip.startTime.toString(),
				endTime: trip.endTime.toString(),
				events: trip.events.map((event) => ({
					...event,
					startTime: event.startTime.toString(),
					endTime: event.endTime.toString(),
				})),
			}));
			setView(trip.area.location);
			return;
		}

		dispatch(clearTrip());
		clearMap();
	};

	const setCurrentTripPlaces = (places: IPlace[]) => {
		dispatch(setTripPlaces(places));
	};

	const setCurrentTripEvents = (events: IEvent[]) => {
		dispatch(setTripEvents(events.map((event) => ({
			...event,
			startTime: event.startTime.toString(),
			endTime: event.endTime.toString(),
		}))));
	};

	const setCurrentTripUsers = (users: IUser[]) => {
		dispatch(setTripUsers(users));
	};

	const setCurrentTripTokens = (tokens: ITokens) => {
		dispatch(setTripTokens(tokens));
	};

	return { currentTrip, inviteTokens, isOwner, isEditor, isReadonly,
		setCurrentTrip, setCurrentTripPlaces, setCurrentTripEvents, setCurrentTripUsers, setCurrentTripTokens };
};
