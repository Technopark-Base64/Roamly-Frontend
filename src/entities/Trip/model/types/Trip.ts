import { IEvent } from '../../../Event';
import { IPlace, IPlaceResponse } from '../../../Place';
import { IUser } from '../../../User';

export interface ITrip {
  id: string,
  users: IUser[],
  startTime: Date,
  endTime: Date,
  area: IPlace,
  places: IPlace[],
  events: IEvent[],
}

export interface ITripResponse {
  id: string,
  users: IUser[]
  start_time: string,
  end_time: string,
  area_id: string,
  area: IPlaceResponse,
  places: IPlaceResponse[],
  events: IEvent[],
}
