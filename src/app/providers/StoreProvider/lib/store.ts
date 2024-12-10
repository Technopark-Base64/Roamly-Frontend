import { configureStore } from '@reduxjs/toolkit';
import { mapReducer } from 'src/widgets/MapWidget';
import { currentTripReducer } from 'src/entities/Trip';
import { currentUserReducer } from 'src/entities/User';
import { dialogReducer } from 'src/shared/services/dialog';
import { notificationReducer } from 'src/shared/services/notifications';


export const store = configureStore({
	reducer: {
		currentUserReducer,
		currentTripReducer,
		notificationReducer,
		dialogReducer,
		mapReducer,
	}
});
