import React, { useState } from 'react';
import { IPlace } from '../../Place';
import { getPlacePhoto } from '../../Place';
import cls from './style.module.scss';

interface IProps {
  place: IPlace;
	selected?: boolean;
	isOpened?: boolean;
  onAdd?: () => void;
	onRemove?: () => void;
	onOpen?: () => void;
	onClickNext?: () => void;
	onClickPrev?: () => void;
}

export const COLLAPSED_PLACECARD_HEIGHT = 105;

export const PlaceCard = ({
	place, selected, isOpened, onAdd, onRemove,
	onOpen, onClickNext, onClickPrev
}: IProps) => {
	const [photoIndex, setPhotoIndex] = useState(0);

	const imageUrl = place.photos?.[photoIndex] && (place.photos[photoIndex].startsWith('https://')
		? place.photos[photoIndex]
		: getPlacePhoto(place.photos[photoIndex], isOpened ? 450 : 100));

	const ratingBlock = (
		<div className={cls.rating}>
			{place.rating}&nbsp;&nbsp;
			<span className={place.rating > 0.5 ? cls.star : ''}>★</span>
			<span className={place.rating > 1.5 ? cls.star : ''}>★</span>
			<span className={place.rating > 2.5 ? cls.star : ''}>★</span>
			<span className={place.rating > 3.5 ? cls.star : ''}>★</span>
			<span className={place.rating > 4.5 ? cls.star : ''}>★</span>
		</div>
	);

	if (!isOpened)
		return (
			<div className={cls.collapsedCard} onClick={onOpen}>
				{imageUrl
					? <img className={cls.image} src={imageUrl} alt=""/>
					: <div className={cls.image} />
				}
				<div className={cls.titleCollapsed}>
					<div className={cls.name}>
						{place.name}
					</div>
					{ ratingBlock }
				</div>
			</div>
		);

	return (
		<div className={cls.card}>
			{imageUrl
				? <img className={cls.imageFull} src={imageUrl} key={imageUrl} alt=""/>
				: <div className={cls.imageFull} />
			}

			{imageUrl && photoIndex > 0 &&
					<button
						className={`${cls.photoBtn} ${cls.photoLeftBtn}`}
						onClick={() => setPhotoIndex(prev => prev - 1)}
					>
						{'<'}
					</button>
			}
			{imageUrl && photoIndex < place.photos.length - 1 &&
					<button
						className={`${cls.photoBtn} ${cls.photoRightBtn}`}
						onClick={() => setPhotoIndex(prev => prev + 1)}
					>
						{'>'}
					</button>
			}

			<div className={cls.title}>
				<div className={cls.name}>
					{place.name}
				</div>
				{ ratingBlock }
			</div>

			<hr style={{ width: '95%' }}/>

			<div className={cls.info}>
				<div>
					Дефолтное описание. Музей с предметами старины, скульптурой и живописью, а также временными экспозициями. Памятник классицизма.
				</div>
				<div>
					📍&nbsp; {place.formattedAddress}
				</div>
				<div>
					⏱&nbsp; 10:00–19:00
				</div>
			</div>

			<div className={cls.buttonContainer}>
				<button
					className={`shared-button ${!onClickPrev && cls.hidden}`}
					onClick={onClickPrev}
				>
					Предыдущее
				</button>

				<button
					className={`shared-button ${(!onAdd || !onRemove) && cls.hidden}`}
					onClick={selected ? onRemove : onAdd}
				>
					{selected ? 'Удалить' : 'Добавить'}
				</button>

				<button
					className={`shared-button ${!onClickNext && cls.hidden}`}
					onClick={onClickNext}
				>
					Следующее
				</button>
			</div>
		</div>
	);
};
