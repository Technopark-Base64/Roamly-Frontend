import { useState, MouseEvent } from 'react';
import { TripForm } from 'src/features/TripForm';
import { ModalWrapper } from 'src/shared/components/ModalWrapper';
import { defaultTripName } from 'src/shared/utils';
import { getPlacePhoto } from '../../Place';
import { isTripActive } from '../lib/tripStates';
import { ITrip } from '../model/types/Trip';
import cls from './style.module.scss';

interface IProps {
  trip: ITrip;
  onClick?: () => void;
}

export const TripCard = ({ trip, onClick }: IProps) => {
	const [showModal, setShowModal] = useState(false);

	const isActive = isTripActive(trip);

	const handleClickEdit = (e: MouseEvent) => {
		e.stopPropagation();
		setShowModal(true);
	};

	return (
		<div className={`${cls.card} ${onClick && cls.pointer} ${isActive && cls.activeTrip}`} onClick={onClick}>
			{trip.area.photos?.length ?
				<img className={cls.image} src={getPlacePhoto(trip.area.photos[0])} alt="" /> :
				<div className={cls.image} />
			}
			<div className={cls.info}>
				<div className={cls.name}>
					{trip.name || defaultTripName(trip.area.name)}
				</div>

				<div className={cls.date}>
					Направление: {trip.area.name} <br/>
					{`${trip.startTime.toLocaleDateString()} – ${trip.endTime.toLocaleDateString()}`}
					{isActive && <><br/> Идет прямо сейчас! </>}
				</div>
			</div>

			<div>
				<button className="shared-button shared-button-active" onClick={handleClickEdit}>
					Ред.
				</button>
			</div>

			{showModal &&
				<ModalWrapper onClose={() => setShowModal(false)} >
					<TripForm prevTrip={trip} />
				</ModalWrapper>
			}
		</div>
	);
};