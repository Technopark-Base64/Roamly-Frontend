import { getPlacePhoto } from 'src/entities/Place';
import { formatEvent } from '../lib/formatEvent';
import { IEvent } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  calendarEvent: IEvent,
}

export const EventCard = ({ calendarEvent }: IProps) => {
	const event = formatEvent(calendarEvent);

	return (
		<div className={cls.card}>
			{event.photo
				? <img className={cls.image} src={getPlacePhoto(event.photo)} alt=""/>
				: <div className={cls.image} />
			}
			<div className={cls.info}>
				{event.name}
				<div className={cls.timeInfo}>
					{event.time} – {event.duration}
				</div>
			</div>
		</div>
	);
};