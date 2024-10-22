import React from 'react';
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
	const handleMapClick = () => {
		window.open(
			`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.placeId}`,
			'_blank',
			'noopener, noreferrer',
		);
	};

	return (
		<div className={`${cls.card} ${selected && colorSelected && cls.selected}`}>
			{place.photos?.length ?
				<img
					className={`${cls.image} ${(!colorSelected || !selected) && cls.selected}`}
					src={getPlacePhoto(place.photos[0])} alt=""
				/> :
				<div className={`${cls.image} ${(!colorSelected || !selected) && cls.selected}`} />
			}
			<div className={cls.info}>
				<div className={cls.name}>
					{place.name}
				</div>
				{place.formattedAddress}
				<div className={cls.buttonContainer}>
					{onAdd && onRemove &&
						<button className="shared-button" onClick={!selected ? onAdd : onRemove}>
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