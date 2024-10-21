import { GOOGLE_API_KEY } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';
import { IPlace, IPlaceResponse } from '../model/types';

export const searchPlaces = async (region: IPlace, place: string) => {
	try {
		const response = await fetch(requestUrl(region, place));
		const results: IPlaceResponse[] = (await response.json()).results;

		return results.map(mapResponseToPlace);
	} catch {
		return [];
	}
};

const requestUrl = (region: IPlace, place: string) => {
	return `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${place}
	&location=${region.location.lat},${region.location.lng}
	&radius=20000
	&fields=formatted_address,name,rating,geometry
	&key=${GOOGLE_API_KEY}`;
};

