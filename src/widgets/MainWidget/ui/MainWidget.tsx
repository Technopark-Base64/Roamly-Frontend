import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FullCalendar } from 'src/features/FullCalendar';
import { EventCard, IEvent, sortEventsByTime } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useMapWidget } from '../../MapWidget';
import cls from './style.module.scss';

export const MainWidget = () => {
	const { currentTrip } = useCurrentTrip();
	const { setMarkers, selectPlace } = useMapWidget();
	const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
	const navigate = useNavigate();
	const location = useLocation();

	const handleGoToRecoms = () => {
		navigate(`${location.pathname}#recoms`);
	};

	const handleGoToCalendar = () => {
		navigate(`${location.pathname}#calendar`);
	};

	const handleDayChange = (currentDayEvents: IEvent[]) => {
		if (!currentDayEvents || !currentDayEvents.length) {
			setSelectedEvent(null);
			return;
		}

		setSelectedEvent(currentDayEvents.sort(sortEventsByTime)[0]);

		setMarkers(currentDayEvents
			.sort(sortEventsByTime)
			.flatMap((event) => event.place ? [{
				id: event.place.placeId,
				title: event.place.name,
				location: event.place.location,
			}] : []), true);
	};

	const handleSelectEvent = (event: IEvent) => {
		setSelectedEvent(event);
		selectPlace(event.place?.placeId ?? '');
	};

	return (
		<div className={cls.wrapper}>

			<FullCalendar
				events={currentTrip?.events ?? []}
				views={['listDay']}
				height={ selectedEvent ? 470 : 650}
				onClickEvent={handleSelectEvent}
				onVisibleEventsChange={handleDayChange}
			/>

			{currentTrip && !currentTrip.events.length &&
				<button
					className={`shared-button shared-button-active ${cls.hintBtn}`}
					onClick={!currentTrip.places.length ? handleGoToRecoms : handleGoToCalendar}
				>
					Перейти в {!currentTrip.places.length ? 'Рекомендации' : 'Календарь'}
				</button>
			}

			{ selectedEvent && <EventCard event={selectedEvent} /> }
		</div>
	);
};