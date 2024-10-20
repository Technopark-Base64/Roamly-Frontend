import { GOOGLE_API_KEY } from '../../../shared/config';
import { IPlace } from '../model/types';

export const searchPlaces = async (region: IPlace, place: string) => {
	try {
		const response = await fetch(requestUrl(region, place));

		return (await response.json()).results;
	} catch {
		return [];
	}
};

const requestUrl = (region: IPlace, place: string) => {
	return `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${place}
	&location=${region.geometry.location.lat},${region.geometry.location.lng}
	&radius=20000
	&fields=formatted_address,name,rating,opening_hours,geometry
	&key=${GOOGLE_API_KEY}`;
};

