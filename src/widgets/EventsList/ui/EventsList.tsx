import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IEvent, EventCard, makeSchedule } from 'src/entities/Event';
import { ISchedule } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { useAutoSchedule } from '../hooks/useAutoSchedule';
import cls from './style.module.scss';

interface IProps {
	events: IEvent[],
}

export const EventsList = ({ events }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const { AutoSchedule, LoadingSchedule } = useAutoSchedule();
	const navigate = useNavigate();
	const location = useLocation();

	const handleGoToPlaces = () => {
		navigate(`${location.pathname}#places`);
	};

	const handleSchedule = () => {
		currentTrip && AutoSchedule();
	};

	const schedule: ISchedule = useMemo(() => makeSchedule(events), [events]);

	return (
		<>
			{!!schedule.length && !LoadingSchedule &&
				<div className={cls.headerButton}>
					<button className="shared-button" onClick={handleSchedule}>
						Спланировать
					</button>
				</div>
			}
			<div className={cls.listContainer}>
				{!currentTrip?.places.length && !schedule.length &&
					<div className={cls.emptyLabel}>
						Сначала выберите места, которые хотите посетить
						<button className="shared-button" onClick={handleGoToPlaces}>
							Перейти в Места
						</button>
					</div>
				}

				{ LoadingSchedule && <LoadingScreen /> }

				{!schedule.length && !!currentTrip?.places.length && !LoadingSchedule &&
					<div className={cls.emptyLabel}>
						Все готово для построения расписания
						<button className="shared-button" onClick={handleSchedule}>
							Спланировать
						</button>
					</div>
				}

				{!LoadingSchedule && schedule.map((item) => (
					<>
						<div className={cls.dayLabel}>
							{item.day}
						</div>
						{item.events.map((event) => (
							<EventCard key={event.place.placeId} event={event} />
						))}
					</>
				))}
			</div>
		</>
	);
};
