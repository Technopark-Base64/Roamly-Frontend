import { createSlice } from '@reduxjs/toolkit';
import { ICurrentUserStorage } from '../../model/types/Store';
import { IUser } from '../../model/types/User';

const initialState: ICurrentUserStorage = {
	user: null,
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		newCurrentUser: (state, action: { payload: IUser }) => {
			state.user = action.payload;
		},
		clearCurrentUser: (state) => {
			state.user = null;
		},
	},
});

export const { newCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
