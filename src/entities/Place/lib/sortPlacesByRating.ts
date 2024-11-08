import { IPlace } from '../model/types';

export const sortPlacesByRating = (p1: Pick<IPlace, 'rating'>, p2: Pick<IPlace, 'rating'>) => {
	return p2.rating - p1.rating;
};