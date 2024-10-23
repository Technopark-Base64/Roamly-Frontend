import { IPlace } from 'src/entities/Place';

export interface IEvent {
  place: IPlace,
  startTime: Date,
  endTime: Date,
}

export interface IFormattedEvent {
  time: string,
  duration: string,
  place: IPlace,
}

export type ISchedule = {
  day: string,
  events: IFormattedEvent[],
}[];
