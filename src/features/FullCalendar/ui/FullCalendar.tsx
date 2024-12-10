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
	selectedPlace?: string,
	onShowMenu?: () => void,
	// eslint-disable-next-line no-unused-vars
	onClickEvent: (event: IEvent) => void,
	// eslint-disable-next-line no-unused-vars
	onVisibleEventsChange?: (events: IEvent[]) => void,
}

export const Calendar = ({ events, views, height, selectedPlace, onShowMenu, onClickEvent, onVisibleEventsChange }: IProps) => {
	const { currentTrip, isReader } = useCurrentTrip();
	const { handleEventChange, handleEventResize, handleDatesSet, handleEventClick, handleSelect, handleEventReceive }
		= useHandleCalendarEvent({ onVisibleEventsChange, onClickEvent });

	const calendarEvents: ICalendarEvent[] = useMemo(() => {
		const e: ICalendarEvent[] = events.map((event) => ({
			id: event.id,
			title: event.name || event.place?.name || 'Новое событие',
			place: event.place,
			backgroundColor: selectedPlace && selectedPlace === event.place?.placeId
				? '#efcb75' : '',
			start: event.startTime,
			end: event.endTime,
			name: event.name
		}));

		const dayEvents = currentTrip ? createDayEvents(currentTrip.startTime, currentTrip.endTime) : [];

		return [...e, ...dayEvents];
	}, [events, selectedPlace]);

	const initialDate = currentTrip?.startTime && calculateInitialDate(currentTrip.startTime, currentTrip.endTime);

	const leftButtons = views.length > 1
		? `${onShowMenu ? 'showMenu ' : ''}${views.join(',')}`
		: 'today';

	const rightButtons = `prev,${views.length > 1 ? 'today,' : ''}next`;

	return (
		<div className={cls.wrapper}>
			<FullCalendar
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
				initialDate={initialDate}
				initialView={views[0]}
				scrollTime="09:00:00"
				customButtons={{
					showMenu: {
						text: 'Места',
						click: onShowMenu,
					},
				}}
				headerToolbar={{
					left: leftButtons,
					center: 'title',
					right: rightButtons
				}}
				nowIndicator={true}
				navLinks={!views.includes('listDay')}
				selectable={!isReader}
				editable={!isReader}
				droppable={!isReader}
				firstDay={1}
				locale={ruLocale}
				height={height ?? 650}
				events={calendarEvents}
				eventClick={handleEventClick}
				eventDrop={handleEventChange}
				eventResize={handleEventResize}
				select={handleSelect}
				datesSet={handleDatesSet}
				eventReceive={handleEventReceive}
			/>
		</div>
	);
};
