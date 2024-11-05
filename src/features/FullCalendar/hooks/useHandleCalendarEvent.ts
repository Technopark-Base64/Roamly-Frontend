import { EventClickArg, EventChangeArg } from '@fullcalendar/core';
import { useEffect, useState } from 'react';
import { IEventResponse } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useCreateUpdateEvent } from '../../EventForm';

export const useHandleCalendarEvent = () => {
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

	const handleEventClick = (info: EventClickArg) => {
		console.log(info.event.extendedProps.place?.placeId);
	};

	const handleEventChange = (info: EventChangeArg) => {
		setEvent({
			id: info.event.id,
			name: info.event.title,
			place_id: info.event.extendedProps.place?.place_id,
			start_time: info.event.start?.toISOString() ?? '',
			end_time: info.event.end?.toISOString() ?? '',
			trip_id: currentTrip?.id ?? '',
		});
	};

	const handleEventResize = (info: EventChangeArg) => {
		setEvent({
			id: info.event.id,
			name: info.event.title,
			place_id: info.event.extendedProps.place?.place_id,
			start_time: info.event.start?.toISOString() ?? '',
			end_time: info.event.end?.toISOString() ?? '',
			trip_id: currentTrip?.id ?? '',
		});
	};

	return { handleEventClick, handleEventChange, handleEventResize };
};
