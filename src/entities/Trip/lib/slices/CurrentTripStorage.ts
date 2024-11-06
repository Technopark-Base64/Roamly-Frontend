import { createSlice } from '@reduxjs/toolkit';
import { IPlace } from '../../../Place';
import { ICurrentTripStorage, IEventStorage, ITripStorage } from '../../model/types/Store';

const initialState: ICurrentTripStorage = {
	trip: null,
};

const currentTripSlice = createSlice({
	name: 'currentTrip',
	initialState,
	reducers: {
		setTrip: (state, action: { payload: ITripStorage }) => {
			state.trip = action.payload;
		},
		setTripPlaces: (state, action: { payload: IPlace[] }) => {
			if (state.trip) state.trip.places = action.payload;
		},
		setTripEvents: (state, action: { payload: IEventStorage[] }) => {
			if (state.trip)
				state.trip.events = action.payload;
		},
		clearTrip: (state) => {
			state.trip = null;
		},
	},
});

export const { setTrip, setTripPlaces, setTripEvents, clearTrip } = currentTripSlice.actions;

export default currentTripSlice.reducer;
