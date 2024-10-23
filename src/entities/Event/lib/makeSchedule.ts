import { IEvent, ISchedule } from '../model/types';
import { formatEvent } from './formatEvent';

export const makeSchedule = (events: IEvent[]): ISchedule => {
	if (!events.length)
		return [];

	console.log(events);

	const sortedEvents = [...events].sort((e1, e2) => e1.startTime.getTime() - e2.startTime.getTime());

	const schedule: ISchedule = [{
		day: toDayString(sortedEvents[0].startTime),
		events: []
	}];

	sortedEvents.forEach((event) => {
		if (toDayString(event.startTime) === schedule.at(-1)?.day) {
			schedule.at(-1)?.events.push(formatEvent(event));
		} else {
			schedule.push({
				day: toDayString(event.startTime),
				events: [formatEvent(event)],
			});
		}
	});
	
	return schedule;
};

const toDayString = (date: Date): string => {
	const res = date.toLocaleDateString('ru-RU', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});
	return res.charAt(0).toUpperCase() + res.slice(1);
};
