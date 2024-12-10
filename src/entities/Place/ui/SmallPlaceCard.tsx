import { getPlacePhoto } from '../api/getPlacePhoto';
import { IPlace } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  place: IPlace;
}

export const SmallPlaceCard = ({ place }: IProps) => {
	const imageUrl = place.photos?.[0] && (place.photos[0].startsWith('https://')
		? place.photos[0]
		: getPlacePhoto(place.photos[0].slice(place.photos[0].startsWith('places/') ? 42 : 0), 150));

	return (
		<div className={cls.smallCard}>
			{imageUrl
				? <img className={cls.image} src={imageUrl} alt=""/>
				: <div className={cls.image} />
			}
			<div className={cls.name}>
				{place.name}
			</div>
		</div>
	);
};
