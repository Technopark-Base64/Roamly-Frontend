import { IEvent } from '../../../Event';
import { IPlace } from '../../../Place';
import { IUser } from '../../../User';

export interface ITrip {
  id: string,
  users?: IUser[],
  startTime: Date,
  endTime: Date,
  area: IPlace,
  places?: IPlace[],
  events?: IEvent[],
}
