import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/providers/StoreProvider';
import { setDialog, clearDialog } from '../lib/slices/DialogStorage';
import { IDialog } from '../model/types';

export const useDialogService = () => {
	const dispatch = useDispatch<AppDispatch>();

	const OpenDialog = (dialog: IDialog) => {
		dispatch(setDialog(dialog));
	};

	const CloseDialog = () => {
		dispatch(clearDialog());
	};

	return { OpenDialog, CloseDialog };
};
