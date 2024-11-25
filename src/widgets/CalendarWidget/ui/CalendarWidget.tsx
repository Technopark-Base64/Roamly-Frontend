import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EventForm } from 'src/features/EventForm';
import { FullCalendar } from 'src/features/FullCalendar';
import { IEvent } from 'src/entities/Event';
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
					<FullCalendar
						events={events}
						views={['timeGridWeek', 'dayGridMonth']}
						onAdd={() => setShowModal(true)}
						onSchedule={AutoSchedule}
						onClickEvent={setEventToEdit}
					/>
				}
			</div>
		</>
	);
};
