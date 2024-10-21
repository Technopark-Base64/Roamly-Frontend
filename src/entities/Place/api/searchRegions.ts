import { GOOGLE_API_KEY } from 'src/shared/config';
import { mapResponseToPlace } from '../lib/mapResponseToPlace';
import { IPlaceResponse } from '../model/types';

export const searchRegions = async (region: string) => {
	try {
		const response = await fetch(requestUrl(region));
		const result: IPlaceResponse[] = (await response.json()).results;

		return result.map(mapResponseToPlace);
	} catch {
		return [];
	}
};

const requestUrl = (region: string) => {
	return `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${region}
	&type=locality
	&fields=formatted_address,name,rating,geometry
	&key=${GOOGLE_API_KEY}`;
};
