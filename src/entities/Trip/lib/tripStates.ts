import { ITrip } from '../model/types/Trip';

export const isTripActive = (trip: ITrip) => {
	const now = (new Date()).getTime();

	return trip.startTime.getTime() <= now &&
    trip.endTime.getTime() >= now;
};

export const isTripEnded = (trip: ITrip) => {
	const now = (new Date()).getTime();

	return trip.endTime.getTime() < now;
};

export const isTripNotStarted = (trip: ITrip) => {
	const now = (new Date()).getTime();

	return trip.endTime.getTime() > now;
};
