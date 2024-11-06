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
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const handleGoToRecoms = () => {
		navigate(`${location.pathname}#recoms`);
	};

	return (
		<>
			<div className={cls.listContainer}>
				{!currentTrip?.places.length && !events.length &&
					<div className={cls.emptyLabel}>
						Сначала выберите места, которые хотите посетить
						<button className="shared-button" onClick={handleGoToRecoms}>
							Перейти в Рекомендации
						</button>
					</div>
				}

				{ LoadingSchedule && <LoadingScreen message="Создание плана поездки..." /> }

				{showModal &&
					<ModalWrapper onClose={() => setShowModal(false)}>
						<EventForm onSuccess={() => setShowModal(false)}/>
					</ModalWrapper>
				}

				{!!currentTrip?.places.length && !LoadingSchedule &&
					<FullCalendar
						events={events}
						onAdd={() => setShowModal(true)}
						onShedule={AutoSchedule}
					/>
				}
			</div>
		</>
	);
};
