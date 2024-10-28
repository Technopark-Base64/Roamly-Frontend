import { RootState } from 'src/app/providers/StoreProvider';

export const getCurrentTrip = (state: RootState) => {
	return state.currentTripReducer.trip ? {
		...state.currentTripReducer.trip,
		startTime: new Date(state.currentTripReducer.trip.startTime),
		endTime: new Date(state.currentTripReducer.trip.endTime),
	} : null;
};
