import { INotification } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  notification: INotification,
  onClose?: () => void,
}

export const NotificationCard = ({ notification, onClose }: IProps) => {

	return (
		<div className={`${cls.card} ${notification.error && cls.errorCard}`}>
			<div className={cls.messageContainer}>
				{notification.message}
			</div>

			<div className={cls.closeBtn} onClick={onClose}>
				X
			</div>
		</div>
	);
};
