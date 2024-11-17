import { getPlacePhoto } from 'src/entities/Place';
import { IEvent } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  event: IEvent,
}

export const EventCard = ({ event }: IProps) => {

	return (
		<div className={cls.card}>
			{event.place?.photos[0]
				? <img className={cls.image} key={event.place?.photos[0]} src={getPlacePhoto(event.place.photos[0])} alt=""/>
				: <div className={cls.image} />
			}
			<div className={cls.info}>
				{ event.name || event.place?.name || 'Новое событие'}
				<div className={cls.timeInfo}>
					{event.startTime.toLocaleTimeString().slice(0, -3)} – {event.endTime.toLocaleTimeString().slice(0, -3)}
				</div>
			</div>
		</div>
	);
};