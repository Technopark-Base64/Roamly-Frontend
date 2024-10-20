import { configureStore } from '@reduxjs/toolkit';
import { currentUserReducer } from 'src/entities/User';


export const store = configureStore({
	reducer: {
		currentUserReducer,
	}
});
