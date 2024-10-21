import { RootState } from 'src/app/providers/StoreProvider';

export const getCurrentTrip = (state: RootState) => {
	return state.currentTripReducer.trip;
};
