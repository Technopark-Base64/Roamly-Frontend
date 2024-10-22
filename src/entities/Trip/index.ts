import { useCurrentTrip } from './hooks/useCurrentTrip';
import currentTripReducer from './lib/slices/CurrentTripStorage';
import { ITrip } from './model/types/Trip';
import { TripCard } from './ui/TripCard';

export type {
	ITrip,
};

export {
	TripCard,

	useCurrentTrip,
	currentTripReducer,
};