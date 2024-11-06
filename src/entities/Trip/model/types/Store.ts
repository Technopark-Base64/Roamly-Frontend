import { IEvent } from '../../../Event';
import { ITrip } from './Trip';

export type IEventStorage = Omit<IEvent, 'startTime' | 'endTime'> & {
  startTime: string,
  endTime: string,
}

export type ITripStorage = Omit<ITrip, 'startTime' | 'endTime' | 'events'> & {
  startTime: string,
  endTime: string,
  events: IEventStorage[],
}

export interface ICurrentTripStorage {
  trip: ITripStorage | null,
}
