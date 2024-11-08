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
			<div className={cls.timeInfo}>
				<div className={cls.startTime}>
					{event.time}
				</div>
				{event.duration}
			</div>

			<div className={cls.placeInfo}>
				{event.photo &&
					<img className={cls.image} src={getPlacePhoto(event.photo)} alt=""/>
				}
				{event.name}
			</div>
		</div>
	);
};