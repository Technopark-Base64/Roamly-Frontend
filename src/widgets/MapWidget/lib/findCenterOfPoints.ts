import { IMarker } from '../model/types';

export const findCenterOfPoints = (points: Pick<IMarker, 'location'>[]) => {
	if (!points) {
		return { lat: 0, lng: 0 };
	}

	const averageLat = points.reduce((acc, p) => acc + p.location.lat, 0) / points.length;
	const averageLng = points.reduce((acc, p) => acc + p.location.lng, 0) / points.length;

	return {
		lat: averageLat,
		lng: averageLng,
	};
};
