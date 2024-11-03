import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/providers/StoreProvider';
import { removeNotification } from '../lib/slices/NotificationStorage';
import { getNotifications } from '../model/selectors/getNotifications';
import { NotificationCard } from './NotificationCard';
import cls from './style.module.scss';

export const Notifications = () => {
	const notifications = useSelector((state: RootState) => getNotifications(state));
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={cls.wrapper}>
			<div  className={cls.listContainer}>
				{notifications.map((not) =>
					<NotificationCard key={not.id} notification={not} onClose={() => dispatch(removeNotification(not.id))} />)
				}
			</div>
		</div>
	);
};