import { GOOGLE_API_KEY } from '../../../shared/config';
import { TPlacePhoto } from '../model/types';

export const getPlacePhoto = (photo: TPlacePhoto, width = 200) => {
	return `https://maps.googleapis.com/maps/api/place/photo
	?maxwidth=${width}
	&photo_reference=${photo.photo_reference}
	&key=${GOOGLE_API_KEY}`;
};
