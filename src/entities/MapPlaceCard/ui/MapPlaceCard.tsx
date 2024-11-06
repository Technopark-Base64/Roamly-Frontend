import { getPlacePhoto } from '../../Place';
import { IPlace } from '../../Place';
import { useCurrentTrip } from '../../Trip';
import cls from './style.module.scss';

interface IProps {
  place: IPlace,
  onAdd?: () => void,
  onRemove?: () => void,
	onClose?: () => void,
}

export const MapPlaceCard = ({ place, onAdd, onRemove, onClose }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const selected = !!currentTrip?.places.find((pl) => pl.placeId === place.placeId);

	const handleMapClick = () => {
		window.open(
			`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.placeId}`,
			'_blank',
			'noopener, noreferrer',
		);
	};

	const imageUrl = place.photos.length && place.photos[0].startsWith('https://')
		? place.photos[0]
		: getPlacePhoto(place.photos[0]);

	return (
		<div className={cls.card}>
			<div className={cls.photoContainer}>
				{imageUrl
					? <img className={cls.image} src={imageUrl} key={imageUrl}/>
					: <div className={cls.image} />
				}

				<div><b><span className={cls.star}>★</span> {place.rating} </b></div>

				{ onClose && <div className={cls.closeButton} onClick={onClose}> x </div> }
			</div>

			<div className={cls.info}>
				<div className={cls.name}>
					{`${place.name.slice(0, 60)}${place.name.length >= 60 ? '...' : ''}`}
				</div>
			</div>

			<div className={cls.buttonContainer}>
				{onAdd && onRemove &&
					<button className="shared-button" onClick={selected ? onRemove : onAdd}>
						{selected ? 'Удалить' : 'Добавить'}
					</button>
				}
				<button className="shared-button" onClick={handleMapClick}>
					Google Maps
				</button>
			</div>
		</div>
	);
};