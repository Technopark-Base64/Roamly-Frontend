import { IPlace } from 'src/entities/Place';

export interface IEvent {
  id: string,
  name?: string,
  place?: IPlace,
  startTime: Date,
  endTime: Date,
}

export interface IEventResponse {
  id: string,
  name?: string,
  start_time: string,
  end_time: string,
  place_id?: string,
  trip_id: string,
}

export interface IFormattedEvent {
  time: string,
  duration: string,
  place: IPlace,
}
