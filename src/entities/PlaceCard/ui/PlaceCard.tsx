import { IPlace } from '../../Place';
import { getPlacePhoto } from '../../PlacePhoto';
import cls from './style.module.scss';

interface IProps {
  place: IPlace;
  onClick?: () => void;
}

export const PlaceCard = ({ place, onClick }: IProps) => {

	return (
		<div className={cls.card} onClick={onClick}>
			{place.photos?.length && <img className={cls.image} src={getPlacePhoto(place.photos[0])} alt="" />}
			<div className={cls.info}>
				<div className={cls.name}>
					{place.name}
				</div>
			</div>
		</div>
	);
};