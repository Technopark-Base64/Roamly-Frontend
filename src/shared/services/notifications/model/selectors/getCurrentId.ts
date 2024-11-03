import { RootState } from 'src/app/providers/StoreProvider';

export const getCurrentId = (state: RootState) => {
	return state.notificationReducer.currentId;
};
