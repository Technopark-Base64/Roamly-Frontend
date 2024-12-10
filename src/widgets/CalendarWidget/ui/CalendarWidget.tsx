import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EventForm } from 'src/features/EventForm';
import { FullCalendar } from 'src/features/FullCalendar';
import { IEvent } from 'src/entities/Event';
import { SmallPlaceCard } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { ModalWrapper } from 'src/shared/components/ModalWrapper';
import { useAutoSchedule } from '../hooks/useAutoSchedule';
import cls from './style.module.scss';

interface IProps {
	events: IEvent[],
}

export const CalendarWidget = ({ events }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const { AutoSchedule, LoadingSchedule } = useAutoSchedule();
	const [eventToEdit, setEventToEdit] = useState<IEvent | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [showMenu, setShowMenu] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	const handleGoToRecoms = () => {
		navigate(`${location.pathname}#recoms`);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setEventToEdit(null);
	};

	return (
		<>
			<div className={cls.content}>
				{!currentTrip?.places.length && !events.length &&
					<div className={cls.emptyLabel}>
						Сначала выберите места, которые хотите посетить
						<button className="shared-button" onClick={handleGoToRecoms}>
							Перейти в Рекомендации
						</button>
					</div>
				}

				{ LoadingSchedule && <LoadingScreen message="Создание плана поездки..." /> }

				{(showModal || eventToEdit) &&
					<ModalWrapper onClose={handleCloseModal}>
						<EventForm prevEvent={eventToEdit} onSuccess={handleCloseModal}/>
					</ModalWrapper>
				}

				{(!!currentTrip?.places.length || !!events.length) && !LoadingSchedule &&
					<>
						{showMenu &&
							<div className={cls.leftMenu}>
								<div className={cls.buttonsContainer}>
									<button className="shared-icon-button" onClick={() => setShowModal(true)}>
										<AddOutlinedIcon/>
									</button>
									<button className="shared-button shared-button-blue" onClick={AutoSchedule}> Авто-планирование </button>
								</div>
								<div className={cls.listContainer}>
									{currentTrip?.places.map((place) => (
										<SmallPlaceCard
											place={place}
											key={place.placeId}
										/>
									))}
								</div>
								<button className="shared-button" onClick={() => setShowMenu(false)}>
									<KeyboardDoubleArrowLeftOutlinedIcon/> Свернуть
								</button>
							</div>
						}

						<FullCalendar
							events={events}
							views={['timeGridWeek', 'dayGridMonth']}
							onShowMenu={!showMenu ? () => setShowMenu(true) : undefined}
							onClickEvent={setEventToEdit}
						/>
					</>
				}
			</div>
		</>
	);
};
