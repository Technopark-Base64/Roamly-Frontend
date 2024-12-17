import { useAddPlaceToTrip, useRemovePlaceFromTrip } from 'src/widgets/PlacesList';
import { getPlacePhoto, IPlace } from '../../Place';
import { useCurrentTrip } from '../../Trip';
import cls from './style.module.scss';

interface IProps {
  place: IPlace,
}

export const PlaceMessageCard = ({ place }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();

	const imageUrl = place.photos?.[0] && (place.photos[0].startsWith('https://')
		? place.photos[0]
		: getPlacePhoto(place.photos[0].slice(place.photos[0].startsWith('places/') ? 42 : 0), 300));

	const selected = !!currentTrip?.places.find(pl => pl.placeId === place.placeId);

	const handleAddPlace = () => {
		if (!selected) {
			AddPlace(place.placeId);
		} else {
			RemovePlace(place.placeId);
		}
	};

	return (
		<div className={cls.card}>
			<div className={cls.rating}>
				{place.rating}&nbsp;&nbsp;
				<span className={cls.star}>★</span>
			</div>

			{imageUrl
				? <img className={cls.image} src={imageUrl} key={imageUrl} alt=""/>
				: <div className={cls.image} />
			}
			<div className={cls.infoBlock}>
				<div className={cls.name}>
					{place.name}
				</div>
				<button className={`shared-button ${!selected && 'shared-button-positive'}`} onClick={handleAddPlace} >
					{ selected ? 'Добавлено' : 'Добавить'}
				</button>
			</div>

		</div>
	);
};
