import { useState } from 'react';
import { FullCalendar } from 'src/features/FullCalendar';
import { EventCard, IEvent, sortEventsByTime } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useMapWidget } from '../../MapWidget';
import cls from './style.module.scss';

export const MainWidget = () => {
	const { currentTrip } = useCurrentTrip();
	const { setMarkers, selectPlace } = useMapWidget();
	const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

	const handleDayChange = (currentDayEvents: IEvent[]) => {
		if (!currentDayEvents) {
			setSelectedEvent(null);
			return;
		}

		setSelectedEvent(currentDayEvents[0]);

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
				height={ selectedEvent ? 544 : 650}
				onClickEvent={handleSelectEvent}
				onVisibleEventsChange={handleDayChange}
			/>

			{ selectedEvent && <EventCard calendarEvent={selectedEvent} /> }
		</div>
	);
};