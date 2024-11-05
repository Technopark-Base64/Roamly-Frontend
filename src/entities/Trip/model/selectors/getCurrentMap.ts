import { RootState } from 'src/app/providers/StoreProvider';

export const getCurrentMapPlace = (state: RootState) => {
	return state.currentTripReducer.mapPlace;
};
