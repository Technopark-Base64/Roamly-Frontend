import { makeSchedule } from './lib/makeSchedule';
import { mapResponseToEvents } from './lib/mapResponseToEvents';
import { IEvent, ISchedule, IEventResponse } from './model/types';
import { EventCard } from './ui/EventCard';

export type {
	IEvent,
	IEventResponse,
	ISchedule,
};

export {
	EventCard,
	makeSchedule,
	mapResponseToEvents
};
