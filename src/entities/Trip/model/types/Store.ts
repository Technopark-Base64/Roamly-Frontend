import { ITrip } from './Trip';

type ITripStorage = Omit<ITrip, 'startTime' | 'endTime'> & {
  startTime: string,
  endTime: string,
}

export interface ICurrentTripStorage {
  trip: ITripStorage | null,
}
