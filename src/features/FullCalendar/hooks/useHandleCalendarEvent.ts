import { DatesSetArg, EventChangeArg, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { EventReceiveArg } from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { IEvent, IEventResponse } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useCreateUpdateEvent } from '../../EventForm';

interface IProps {
	// eslint-disable-next-line no-unused-vars
	onVisibleEventsChange?: (events: IEvent[]) => void,
	// eslint-disable-next-line no-unused-vars
	onClickEvent: (event: IEvent) => void,
}

export const useHandleCalendarEvent = ({ onVisibleEventsChange, onClickEvent }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const [event, setEvent] = useState<IEventResponse>({
		id: '',
		start_time: '',
		end_time: '',
		trip_id: '',
	});
	const { UpdateEvent } = useCreateUpdateEvent(event);

	useEffect(() => {
		event.id && UpdateEvent();
	}, [event]);

	const handleEventChange = (info: EventChangeArg) => {
		setEvent({
			id: info.event.id,
			name: info.event.extendedProps.name,
			place_id: info.event.extendedProps.place?.place_id,
			start_time: info.event.start?.toISOString() ?? '',
			end_time: info.event.end?.toISOString() ?? '',
			trip_id: currentTrip?.id ?? '',
		});
	};

	const handleEventResize = (info: EventChangeArg) => {
		setEvent({
			id: info.event.id,
			name: info.event.extendedProps.name,
			place_id: info.event.extendedProps.place?.place_id,
			start_time: info.event.start?.toISOString() ?? '',
			end_time: info.event.end?.toISOString() ?? '',
			trip_id: currentTrip?.id ?? '',
		});
	};

	const handleDatesSet = (info: DatesSetArg) => {
		if (!currentTrip || !onVisibleEventsChange)
			return;

		const visibleEvents = currentTrip.events.filter((event) =>
			info.start <= event.startTime && event.startTime <= info.end ||
			info.start <= event.endTime && event.endTime <= info.end
		);

		onVisibleEventsChange(visibleEvents);
	};

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

	const handleSelect = (info: DateSelectArg) => {
		if (info.allDay)
			return;

		onClickEvent({
			id: '',
			name: '',
			startTime: info.start,
			endTime: info.end,
		});
	};

	const handleEventReceive = (info: EventReceiveArg) => {
		const event = info.event;

		onClickEvent({
			id: '',
			name: event.extendedProps.name,
			place: event.extendedProps.place,
			startTime: event.start ?? new Date(),
			endTime: event.end ?? new Date(),
		});
	};

	return { handleEventChange, handleEventResize, handleDatesSet, handleEventClick, handleSelect, handleEventReceive };
};
