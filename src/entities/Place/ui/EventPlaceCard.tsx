import { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import { getPlacePhoto } from '../api/getPlacePhoto';
import { IPlace } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  place: IPlace;
	selected?: boolean;
	draggable?: boolean;
	onClick?: () => void;
}

export const EVENT_PLACECARD_HEIGHT = 90;

export const EventPlaceCard = ({ place, onClick, draggable, selected }: IProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current || !draggable)
			return;

		const draggableEl = new Draggable(ref.current, {
			eventData: {
				title: place.name,
				duration: '01:30',
				place: place,
			},
		});
		return () => draggableEl.destroy();
	}, [ref]);

	const imageUrl = place.photos?.[0] && (place.photos[0].startsWith('https://')
		? place.photos[0]
		: getPlacePhoto(place.photos[0].slice(place.photos[0].startsWith('places/') ? 42 : 0), 150));

	const handleClick = () => {
		onClick?.();

		if (!draggable)
			return;
	};

	return (
		<div
			className={`${cls.smallCard} ${selected && cls.selected}`}
			onClick={handleClick} draggable={draggable} ref={ref}
		>
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
