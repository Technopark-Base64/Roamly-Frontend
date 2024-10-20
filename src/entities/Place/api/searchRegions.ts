import { GOOGLE_API_KEY } from 'src/shared/config';

export const searchRegions = async (region: string) => {
	try {
		const response = await fetch(requestUrl(region));

		return (await response.json()).results;
	} catch {
		return [];
	}
};

const requestUrl = (region: string) => {
	return `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${region}
	&type=locality
	&fields=formatted_address,name,rating,opening_hours,geometry
	&key=${GOOGLE_API_KEY}`;
};
