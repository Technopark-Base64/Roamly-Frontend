import { useEffect, useState } from 'react';
import { FullCalendar } from 'src/features/FullCalendar';
import { EventCard, IEvent } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useMapWidget } from '../../MapWidget';
import cls from './style.module.scss';

export const MainWidget = () => {
	const { currentTrip } = useCurrentTrip();
	const { setMarkers, selectPlace } = useMapWidget();
	const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

	useEffect(() => {
		currentTrip && setMarkers(currentTrip.places?.map((pl) => ({
			id: pl.placeId,
			title: pl.name,
			location: pl.location,
		})));
	}, [currentTrip]);

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
			/>

			{ selectedEvent && <EventCard calendarEvent={selectedEvent} /> }
		</div>
	);
};