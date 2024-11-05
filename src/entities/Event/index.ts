import { mapResponseToEvent } from './lib/mapResponseToEvent';
import { IEvent, IEventResponse } from './model/types';
import { EventCard } from './ui/EventCard';

export type {
	IEvent,
	IEventResponse,
};

export {
	EventCard,
	mapResponseToEvent
};
