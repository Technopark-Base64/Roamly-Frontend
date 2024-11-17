import { MouseEvent, useState } from 'react';
import { TripForm } from 'src/features/TripForm';
import { ModalWrapper } from 'src/shared/components/ModalWrapper';
import { defaultTripName, formatMembersNumber } from 'src/shared/utils';
import { getPlacePhoto } from '../../Place';
import { useCurrentUser, UserRole } from '../../User';
import { isTripActive } from '../lib/tripStates';
import { ITrip } from '../model/types/Trip';
import cls from './style.module.scss';

interface IProps {
  trip: ITrip | null;
	isTripPage?: boolean;
  onClick?: () => void;
}

export const TripCard = ({ trip, isTripPage, onClick }: IProps) => {
	const { currentUser } = useCurrentUser();
	const myRole = (currentUser && trip && trip.users.find((u) => u.id === currentUser.id)?.role) ?? UserRole.Owner;

	const [showModal, setShowModal] = useState(false);

	const isActive = !!trip && isTripActive(trip);

	const handleClickEdit = (e: MouseEvent) => {
		e.stopPropagation();
		setShowModal(true);
	};

	const handleClickMembers = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const handleClickShare = (e: MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div className={`${cls.card} ${onClick && cls.pointer} ${isActive && cls.activeTrip}`} onClick={onClick}>
			{trip?.area.photos?.length ?
				<img className={cls.image} src={getPlacePhoto(trip.area.photos[0])} alt="" /> :
				<div className={cls.image} />
			}
			{trip &&
				<div className={cls.info}>
					<div className={cls.name}>
						{defaultTripName(trip?.area.name)}
						{myRole === UserRole.Owner &&
							<button className={`shared-button shared-button-active ${cls.editBtn}`} onClick={handleClickEdit}>
								Ред.
							</button>
						}
					</div>

					<div className={cls.date}>
						Направление: {trip.area.name} <br/>
						{`${trip.startTime.toLocaleDateString()} – ${trip.endTime.toLocaleDateString()}`}
						{isActive && <><br/> Идет прямо сейчас! </>}
					</div>

					<div className={cls.buttonContainer}>
						{isTripPage &&
							<button className="shared-button shared-button-active" onClick={handleClickMembers}>
								{formatMembersNumber(trip.users.length)}
							</button>
						}
						{myRole === UserRole.Owner &&
							<button className="shared-button shared-button-active" onClick={handleClickShare}>
								Ссылка приглашение
							</button>
						}
					</div>
				</div>
			}

			{showModal && trip && myRole === UserRole.Owner &&
				<ModalWrapper onClose={() => setShowModal(false)} >
					<TripForm prevTrip={trip} />
				</ModalWrapper>
			}
		</div>
	);
};