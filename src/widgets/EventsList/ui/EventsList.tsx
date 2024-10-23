import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IEvent, EventCard } from 'src/entities/Event';
import { makeSchedule } from 'src/entities/Event';
import { ISchedule } from 'src/entities/Event';
import { ITrip, useCurrentTrip } from 'src/entities/Trip';
import cls from './style.module.scss';

interface IProps {
	events: IEvent[],
}

export const EventsList = ({ events }: IProps) => {
	const { currentTrip, setCurrentTripEvents } = useCurrentTrip();
	const navigate = useNavigate();
	const location = useLocation();

	const handleGoToPlaces = () => {
		navigate(`${location.pathname}#places`);
	};

	const handleSchedule = () => {
		currentTrip && setCurrentTripEvents(mockEvents(currentTrip));
	};

	const schedule: ISchedule = useMemo(() => makeSchedule(events), [events]);

	return (
		<>
			{!!schedule.length &&
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

				{!schedule.length && !!currentTrip?.places.length &&
					<div className={cls.emptyLabel}>
						Все готово для построения расписания
						<button className="shared-button" onClick={handleSchedule}>
							Спланировать
						</button>
					</div>
				}

				{schedule.map((item) => (
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


const mockEvents = (trip: ITrip): IEvent[] => {
	const low = trip.startTime.getTime();
	const high = trip.endTime.getTime();

	return trip.places.map((place) => {
		const startTime = new Date(Math.floor(Math.random() * (high - low)) + low);
		return {
			startTime,
			endTime: new Date(Math.floor(Math.random() * (high - startTime.getTime())) + startTime.getTime()),
			place,
		};
	});
};
