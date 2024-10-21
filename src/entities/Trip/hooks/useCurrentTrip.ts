import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/providers/StoreProvider';
import { IEvent } from '../../Event';
import { IPlace } from '../../Place';
import { ITrip } from '../index';
import { setTrip, setTripPlaces, setTripEvents, clearTrip } from '../lib/slices/CurrentTripStorage';
import { getCurrentTrip } from '../model/selectors/getCurrentTrip';


export const useCurrentTrip = () => {
	const currentUser = useSelector((state: RootState) => getCurrentTrip(state));
	const dispatch = useDispatch<AppDispatch>();

	const setCurrentTrip = (trip: ITrip | null) => {
		if (trip) {
			dispatch(setTrip(trip));
			return;
		}

		dispatch(clearTrip());
	};

	const setCurrentTripPlaces = (places: IPlace[]) => {
		dispatch(setTripPlaces(places));
	};

	const setCurrentTripEvents = (events: IEvent[]) => {
		dispatch(setTripEvents(events));
	};

	return { currentUser, setCurrentTrip, setCurrentTripPlaces, setCurrentTripEvents };
};
