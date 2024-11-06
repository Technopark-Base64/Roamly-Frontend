import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/app/providers/StoreProvider';
import { useGoogleMap } from 'src/widgets/MapWidget';
import { IEvent } from '../../Event';
import { IPlace } from '../../Place';
import { ITrip } from '../index';
import { setTrip, setTripPlaces, setTripEvents, clearTrip } from '../lib/slices/CurrentTripStorage';
import { getCurrentTrip } from '../model/selectors/getCurrentTrip';


export const useCurrentTrip = () => {
	const currentTrip = useSelector(getCurrentTrip);
	const { setView, clearMap } = useGoogleMap();
	const dispatch = useDispatch<AppDispatch>();

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

	return { currentTrip, setCurrentTrip, setCurrentTripPlaces, setCurrentTripEvents };
};
