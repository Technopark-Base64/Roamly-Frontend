import { createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../../../Event';
import { IPlace } from '../../../Place';
import { ICurrentTripStorage } from '../../model/types/Store';
import { ITrip } from '../../model/types/Trip';

const initialState: ICurrentTripStorage = {
	trip: null,
	mapPlace: null,
};

const currentTripSlice = createSlice({
	name: 'currentTrip',
	initialState,
	reducers: {
		setTrip: (state, action: { payload: ITrip }) => {
			state.trip = {
				...action.payload,
				startTime: action.payload.startTime.toString(),
				endTime: action.payload.endTime.toString(),
			};
		},
		setTripPlaces: (state, action: { payload: IPlace[] }) => {
			if (state.trip) state.trip.places = action.payload;
		},
		setTripEvents: (state, action: { payload: IEvent[] }) => {
			if (state.trip) state.trip.events = action.payload;
		},
		clearTrip: (state) => {
			state.trip = null;
		},
		setMapPlace: (state, action: {payload: IPlace | null }) => {
			state.mapPlace = action.payload;
		},
	},
});

export const { setTrip, setTripPlaces, setTripEvents, clearTrip, setMapPlace } = currentTripSlice.actions;

export default currentTripSlice.reducer;
