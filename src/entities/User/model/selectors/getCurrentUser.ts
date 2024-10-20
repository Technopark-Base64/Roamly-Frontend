import { RootState } from 'src/app/providers/StoreProvider';

export const getCurrentUser = (state: RootState) => {
	return state.currentUserReducer.user;
};
