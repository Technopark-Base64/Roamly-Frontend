import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useMemo } from 'react';
import { IEvent } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { DAY_MS } from 'src/shared/utils';
import { useHandleCalendarEvent } from '../hooks/useHandleCalendarEvent';
import { ICalendarEvent } from '../model/types';
import cls from './style.module.scss';

interface IProps {
  events: IEvent[],
	onAdd: () => void,
	onShedule: () => void,
}

export const Calendar = ({ events, onShedule, onAdd }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const { handleEventClick, handleEventChange, handleEventResize } = useHandleCalendarEvent();

	const calendarEvents: ICalendarEvent[] = useMemo(() => {
		const e: ICalendarEvent[] = events.map((event) => ({
			id: event.id,
			title: event.name || event.place?.name,
			place: event.place,
			start: event.startTime,
			end: event.endTime,
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

	return (
		<div className={cls.wrapper}>
			<FullCalendar
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
				initialDate={currentTrip?.startTime}
				initialView="timeGridWeek"
				scrollTime="09:00:00"
				customButtons={{
					schedule: {
						text: 'Спланировать',
						click: onShedule,
					},
					add: {
						text: '\xa0+\xa0',
						click: onAdd,
					},
				}}
				headerToolbar={{
					left: 'dayGridMonth,timeGridWeek,timeGridDay today',
					center: 'title',
					right: 'schedule prev,next add'
				}}
				nowIndicator={true}
				navLinks={true}
				editable={true}
				firstDay={1}
				locale={ruLocale}
				height={650}
				events={calendarEvents}
				eventClick={handleEventClick}
				eventDrop={handleEventChange}
				eventResize={handleEventResize}
			/>
		</div>
	);
};
