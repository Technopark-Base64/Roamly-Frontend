import { RootState } from 'src/app/providers/StoreProvider';
import { IDialog } from '../types';

export const getDialog = (state: RootState): IDialog | null => {
	return state.dialogReducer.dialog;
};
