import { configureStore } from '@reduxjs/toolkit';
import { currentTripReducer } from 'src/entities/Trip';
import { currentUserReducer } from 'src/entities/User';


export const store = configureStore({
	reducer: {
		currentUserReducer,
		currentTripReducer,
	}
});
