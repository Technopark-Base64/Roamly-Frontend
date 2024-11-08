import { DAY_MS } from 'src/shared/utils';
import { ICalendarEvent } from '../model/types';

export const createDayEvents = (start: Date, end: Date): ICalendarEvent[] => {
	let currentDay = start;
	let counter = 1;

	const events = [];

	while (currentDay <= end) {
		events.push({
			id: `trip-day-${counter}`,
			title: `День ${counter}`,
			start: currentDay,
			end: new Date(+currentDay + DAY_MS),
			allDay: true,
			editable: false,
			display: 'background',
			backgroundColor: 'rgba(127,190,255,0.3)',
		});

		currentDay = new Date(+currentDay + DAY_MS);
		counter++;
	}

	return events;
};
