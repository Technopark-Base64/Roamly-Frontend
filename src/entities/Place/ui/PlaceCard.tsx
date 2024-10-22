import React, { useState } from 'react';
import { IPlace } from '../../Place';
import { getPlacePhoto } from '../../Place';
import cls from './style.module.scss';

interface IProps {
  place: IPlace;
	selected?: boolean;
  onClick?: () => void;
	onClose?: () => void
}

export const PlaceCard = ({ place, selected, onClick, onClose }: IProps) => {
	return (
		<div
			className={`${cls.card} ${selected && cls.selected} ${onClick && cls.pointer}`}
			onClick={onClick}
		>
			{place.photos?.length ?
				<img className={cls.image} src={getPlacePhoto(place.photos[0])} alt="" /> :
				<div className={cls.image} />
			}
			<div className={cls.info}>
				<div className={cls.name}>
					{place.name}
				</div>
			</div>
			{onClose &&
				<div className={cls.closeBtn} onClick={onClose}>
					x
				</div>
			}
		</div>
	);
};