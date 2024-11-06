import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/app/providers/StoreProvider';
import { ITripStorage } from '../types/Store';

export const getCurrentTrip = createSelector(
	(state: RootState) => state.currentTripReducer.trip,
	(trip: ITripStorage | null) => {
		if (!trip) {
			return null;
		}

		return {
			...trip,
			startTime: new Date(trip.startTime),
			endTime: new Date(trip.endTime),
			events: trip.events.map((event) => ({
				...event,
				startTime: new Date(event.startTime),
				endTime: new Date(event.endTime),
			})),
		};
	}
);
