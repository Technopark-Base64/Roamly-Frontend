import { GOOGLE_API_KEY } from 'src/shared/config';

export const getPlacePhoto = (photoUrl: string, width = 200) => {
	return `https://maps.googleapis.com/maps/api/place/photo
	?maxwidth=${width}
	&photo_reference=${photoUrl}
	&key=${GOOGLE_API_KEY}`;
};
