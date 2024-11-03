import { RootState } from 'src/app/providers/StoreProvider';

export const getNotifications = (state: RootState) => {
	return state.notificationReducer.notifications;
};
