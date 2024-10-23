import { getPlacePhoto } from 'src/entities/Place';
import { IFormattedEvent } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  event: IFormattedEvent,
}

export const EventCard = ({ event }: IProps) => {
	const handleMapClick = () => {
		window.open(
			`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${event.place.placeId}`,
			'_blank',
			'noopener, noreferrer',
		);
	};

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
				<button className="shared-button shared-button-active" onClick={handleMapClick}> На карте </button>
			</div>
		</div>
	);
};