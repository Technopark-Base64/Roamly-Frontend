import { IEvent } from '../model/types';

export const sortEventsByTime = (e1: Pick<IEvent, 'startTime'>, e2: Pick<IEvent, 'startTime'>) => {
	return +e1.startTime - +e2.startTime;
};
