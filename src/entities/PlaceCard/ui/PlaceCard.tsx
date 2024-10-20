import { useState } from 'react';
import { IPlace } from '../../Place';
import { getPlacePhoto } from '../../PlacePhoto';
import cls from './style.module.scss';

interface IProps {
  place: IPlace;
	selected?: boolean;
  onClick?: () => void;
}

export const PlaceCard = ({ place, selected, onClick }: IProps) => {
	const [isSelected, setIsSelected] = useState(selected);

	return (
		<div className={`${cls.card} ${isSelected && cls.selected}`} onClick={() => {onClick?.(); setIsSelected(true);}}>
			{place.photos?.length && <img className={cls.image} src={getPlacePhoto(place.photos[0])} alt="" />}
			<div className={cls.info}>
				<div className={cls.name}>
					{place.name}
				</div>
			</div>
		</div>
	);
};