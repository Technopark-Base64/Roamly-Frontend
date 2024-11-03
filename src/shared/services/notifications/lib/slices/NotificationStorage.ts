import { createSlice } from '@reduxjs/toolkit';
import { INotification, INotificationStorage } from '../../model/types';

const initialState: INotificationStorage = {
	notifications: [],
	currentId: -1,
};

const NotificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		addNotification: (state, action: { payload: INotification & { id: number } }) => {
			state.currentId = action.payload.id;
			state.notifications.push(action.payload);
		},
		clearNotifications: (state) => {
			state.notifications = [];
		},
		removeNotification: (state, action: { payload: number }) => {
			state.notifications = state.notifications.filter((not) => not.id !== action.payload);
		},
	},
});

export const { addNotification, clearNotifications, removeNotification } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
