import { useNavigate, useLocation } from 'react-router-dom';
import { FullCalendar } from 'src/features/FullCalendar';
import { IEvent } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { useAutoSchedule } from '../hooks/useAutoSchedule';
import cls from './style.module.scss';

interface IProps {
	events: IEvent[],
}

export const CalendarWidget = ({ events }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const { AutoSchedule, LoadingSchedule } = useAutoSchedule();
	const navigate = useNavigate();
	const location = useLocation();

	const handleGoToPlaces = () => {
		navigate(`${location.pathname}#places`);
	};

	return (
		<>
			<div className={cls.listContainer}>
				{!currentTrip?.places.length && !events.length &&
					<div className={cls.emptyLabel}>
						Сначала выберите места, которые хотите посетить
						<button className="shared-button" onClick={handleGoToPlaces}>
							Перейти в Места
						</button>
					</div>
				}

				{ LoadingSchedule && <LoadingScreen message="Создание плана поездки..." /> }

				{!!currentTrip?.places.length && !LoadingSchedule &&
					<FullCalendar
						events={events}
						onAdd={() => null}
						onShedule={AutoSchedule}
					/>
				}
			</div>
		</>
	);
};
