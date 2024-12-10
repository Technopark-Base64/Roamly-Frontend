import { createSlice } from '@reduxjs/toolkit';
import { IDialog, IDialogStorage } from '../../model/types';

const initialState: IDialogStorage = {
	dialog: null,
};

const DialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		setDialog: (state, action: { payload: IDialog }) => {
			state.dialog = action.payload;
		},
		clearDialog: (state) => {
			state.dialog = null;
		},
	},
});

export const { setDialog, clearDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
