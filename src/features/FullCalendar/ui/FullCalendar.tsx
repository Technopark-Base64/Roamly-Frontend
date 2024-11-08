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
import { DAY_MS } from 'src/shared/utils';
import { useHandleCalendarEvent } from '../hooks/useHandleCalendarEvent';
import { calculateInitialDate } from '../lib/calculateInitialDate';
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
}

export const Calendar = ({ events, views, height, onSchedule, onAdd, onClickEvent }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const { handleEventChange, handleEventResize } = useHandleCalendarEvent();

	const calendarEvents: ICalendarEvent[] = useMemo(() => {
		const e: ICalendarEvent[] = events.map((event) => ({
			id: event.id,
			title: event.name || event.place?.name || 'Новое событие',
			place: event.place,
			start: event.startTime,
			end: event.endTime,
			name: event.name
		}));

		currentTrip && e.push({
			id: 'entire-trip',
			start: currentTrip.startTime,
			end: new Date(+currentTrip.endTime + DAY_MS),
			allDay: true,
			display: 'background',
			backgroundColor: '#7fbeff',
		});

		return e;
	}, [events]);

	const handleEventClick = (info: EventClickArg) => {
		const event = info.event;
		onClickEvent({
			id: event.id,
			name: event.extendedProps.name,
			place: event.extendedProps.place,
			startTime: event.start ?? new Date(),
			endTime: event.end ?? new Date(),
		});
	};

	const initialDate = currentTrip?.startTime && calculateInitialDate(currentTrip.startTime, currentTrip.endTime);

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
					left: `${views.length > 1 ? views.join(',') + ' ' : ''}today`,
					center: 'title',
					right: `${onSchedule ? 'schedule ' : ''}prev,next${onAdd ? ' add' : ''}`
				}}
				nowIndicator={true}
				navLinks={!views.includes('listDay')}
				editable={true}
				firstDay={1}
				locale={ruLocale}
				height={height ?? 650}
				events={calendarEvents}
				eventClick={handleEventClick}
				eventDrop={handleEventChange}
				eventResize={handleEventResize}
			/>
		</div>
	);
};
