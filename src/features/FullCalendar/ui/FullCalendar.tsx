import { EventClickArg } from '@fullcalendar/core';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useMemo } from 'react';
import { IEvent } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useHandleCalendarEvent } from '../hooks/useHandleCalendarEvent';
import { calculateInitialDate } from '../lib/calculateInitialDate';
import { createDayEvents } from '../lib/createDayEvents';
import { ICalendarEvent } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  events: IEvent[],
	views: ('timeGridWeek' | 'dayGridMonth' | 'timeGridDay' | 'listWeek' | 'listDay')[],
	height?: number,
	onAdd?: () => void,
	onSchedule?: () => void,
	// eslint-disable-next-line no-unused-vars
	onClickEvent: (event: IEvent) => void,
	// eslint-disable-next-line no-unused-vars
	onVisibleEventsChange?: (events: IEvent[]) => void,
}

export const Calendar = ({ events, views, height, onSchedule, onAdd, onClickEvent, onVisibleEventsChange }: IProps) => {
	const { currentTrip, isReader } = useCurrentTrip();
	const { handleEventChange, handleEventResize, handleDatesSet } = useHandleCalendarEvent({ onVisibleEventsChange });

	const calendarEvents: ICalendarEvent[] = useMemo(() => {
		const e: ICalendarEvent[] = events.map((event) => ({
			id: event.id,
			title: event.name || event.place?.name || 'Новое событие',
			place: event.place,
			start: event.startTime,
			end: event.endTime,
			name: event.name
		}));

		const dayEvents = currentTrip ? createDayEvents(currentTrip.startTime, currentTrip.endTime) : [];

		return [...e, ...dayEvents];
	}, [events]);

	const handleEventClick = (info: EventClickArg) => {
		const event = info.event;
		if (event.allDay)
			return;

		onClickEvent({
			id: event.id,
			name: event.extendedProps.name,
			place: event.extendedProps.place,
			startTime: event.start ?? new Date(),
			endTime: event.end ?? new Date(),
		});
	};

	const initialDate = currentTrip?.startTime && calculateInitialDate(currentTrip.startTime, currentTrip.endTime);

	const leftButtons = views.length > 1
		? `${views.join(',')}${!isReader ? ' today' : ''}`
		: 'today';

	const rightButtons = !isReader
		? `${onSchedule ? 'schedule ' : ''}prev,next${onAdd ? ' add' : ''}`
		: `${views.length > 1 ? 'today ' : ''}prev,next`;

	return (
		<div className={cls.wrapper}>
			<FullCalendar
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
				initialDate={initialDate}
				initialView={views[0]}
				scrollTime="09:00:00"
				customButtons={{
					schedule: {
						text: 'Спланировать',
						click: onSchedule,
					},
					add: {
						text: '\xa0+\xa0',
						click: onAdd,
					},
				}}
				headerToolbar={{
					left: leftButtons,
					center: 'title',
					right: rightButtons
				}}
				nowIndicator={true}
				navLinks={!views.includes('listDay')}
				editable={!isReader}
				firstDay={1}
				locale={ruLocale}
				height={height ?? 650}
				events={calendarEvents}
				eventClick={handleEventClick}
				eventDrop={handleEventChange}
				eventResize={handleEventResize}
				datesSet={handleDatesSet}
			/>
		</div>
	);
};
