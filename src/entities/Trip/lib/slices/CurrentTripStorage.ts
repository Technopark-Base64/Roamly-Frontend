import { createSlice } from '@reduxjs/toolkit';
import { IPlace } from '../../../Place';
import { IUser } from '../../../User';
import { ICurrentTripStorage, IEventStorage, ITripStorage } from '../../model/types/Store';
import { ITokens } from '../../model/types/Trip';

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
		setTripUsers: (state, action: { payload: IUser[] }) => {
			if (state.trip)
				state.trip.users = action.payload;
		},
		setTripTokens: (state, action: { payload: ITokens }) => {
			if (state.trip)
				state.trip.inviteTokens = action.payload;
		},
		clearTrip: (state) => {
			state.trip = null;
		},
	},
});

export const { setTrip, setTripPlaces, setTripEvents, clearTrip, setTripUsers, setTripTokens } = currentTripSlice.actions;

export default currentTripSlice.reducer;
