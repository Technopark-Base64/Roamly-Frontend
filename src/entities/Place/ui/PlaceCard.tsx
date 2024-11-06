import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGoogleMap } from 'src/widgets/MapWidget';
import { IPlace } from '../../Place';
import { getPlacePhoto } from '../../Place';
import cls from './style.module.scss';

interface IProps {
  place: IPlace;
	selected?: boolean;
	colorSelected?: boolean;
  onAdd?: () => void;
	onRemove?: () => void
}

export const PlaceCard = ({ place, selected, colorSelected, onAdd, onRemove }: IProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { setPlace } = useGoogleMap();
	
	const handleMapClick = () => {
		setPlace(place);
		navigate(`${location.pathname}#map`);
	};

	const imageUrl = place.photos.length && place.photos[0].startsWith('https://')
		? place.photos[0]
		: getPlacePhoto(place.photos[0]);

	return (
		<div className={`${cls.card} ${selected && colorSelected && cls.selected}`}>
			{imageUrl ?
				<img
					className={`${cls.image} ${(!colorSelected || !selected) && cls.selected}`}
					src={imageUrl} alt=""
				/> :
				<div className={`${cls.image} ${(!colorSelected || !selected) && cls.selected}`} />
			}
			<div className={cls.info}>
				<div className={cls.name}>
					{`${place.name.slice(0, 60)}${place.name.length >= 60 ? '...' : ''}`}
					<b> &nbsp;&nbsp; <span className={cls.star}>★</span>&nbsp;{place.rating} </b>
				</div>
				{place.formattedAddress}
				<div className={cls.buttonContainer}>
					{onAdd && onRemove &&
						<button className="shared-button" onClick={selected ? onRemove : onAdd}>
							{selected ? 'Удалить' : 'Добавить в поездку'}
						</button>
					}
					<button className="shared-button" onClick={handleMapClick}>
						Посмотреть на карте
					</button>
				</div>
			</div>
		</div>
	);
};