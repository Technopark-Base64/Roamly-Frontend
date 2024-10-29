import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/providers/StoreProvider';
import { IEvent } from '../../Event';
import { IPlace } from '../../Place';
import { ITrip } from '../index';
import { setTrip, setTripPlaces, setTripEvents, clearTrip, setMapPlace } from '../lib/slices/CurrentTripStorage';
import { getCurrentMapPlace } from '../model/selectors/getCurrentMap';
import { getCurrentTrip } from '../model/selectors/getCurrentTrip';


export const useCurrentTrip = () => {
	const currentTrip = useSelector((state: RootState) => getCurrentTrip(state));
	const currentMapPlace = useSelector((state: RootState) => getCurrentMapPlace(state));
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

	const setCurrentMapPlace = (place: IPlace | null) => {
		dispatch(setMapPlace(place));
	};

	return { currentTrip, currentMapPlace, setCurrentTrip, setCurrentTripPlaces, setCurrentTripEvents, setCurrentMapPlace };
};
