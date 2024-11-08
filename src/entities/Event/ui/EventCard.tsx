import { getPlacePhoto } from 'src/entities/Place';
import { IFormattedEvent } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  event: IFormattedEvent,
	onMapClick?: () => void,
}

export const EventCard = ({ event, onMapClick }: IProps) => {

	return (
		<div className={cls.card}>
			<div className={cls.timeInfo}>
				<div className={cls.startTime}>
					{event.time}
				</div>
				{event.duration}
			</div>

			<div className={cls.placeInfo}>
				{event.place.photos?.length &&
					<img className={cls.image} src={getPlacePhoto(event.place.photos[0])} alt=""/>
				}
				{event.place.name}
			</div>

			<div>
				{ event.place.placeId &&
					<button className="shared-button shared-button-active" onClick={onMapClick}> На карте </button>
				}
			</div>
		</div>
	);
};