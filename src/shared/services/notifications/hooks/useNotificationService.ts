import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/providers/StoreProvider';
import { addNotification, clearNotifications, removeNotification } from '../lib/slices/NotificationStorage';
import { getCurrentId } from '../model/selectors/getCurrentId';
import { INotification } from '../model/types';

// How long notifications stays on screen
const NOTIFICATION_TTL = 5000;

export const useNotificationService = () => {
	const currentId = useSelector((state: RootState) => getCurrentId(state));
	const dispatch = useDispatch<AppDispatch>();

	const Notify = (not: INotification) => {
		const id = currentId + 1;
		dispatch(addNotification({ ...not, id }));

		setTimeout(() => {
			dispatch(removeNotification(id));
		}, NOTIFICATION_TTL);
	};

	const ClearNotifications = () => {
		dispatch(clearNotifications());
	};

	return { Notify, ClearNotifications };
};
