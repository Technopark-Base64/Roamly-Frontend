import { useCurrentTrip } from './hooks/useCurrentTrip';
import { mapResponseToTrip } from './lib/mapResponseToTrip';
import currentTripReducer from './lib/slices/CurrentTripStorage';
import { ITrip, ITripResponse } from './model/types/Trip';
import { TripCard } from './ui/TripCard';

export type {
	ITrip,
	ITripResponse,
};

export {
	TripCard,
	mapResponseToTrip,

	useCurrentTrip,
	currentTripReducer,
};