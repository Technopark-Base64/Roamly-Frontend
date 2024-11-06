import { IPlace, IPlaceResponse } from '../model/types';

export const mapResponseToPlace = (place: IPlaceResponse): IPlace => ({
	formattedAddress: place.formatted_address || place.vicinity || '',
	location: {
		lat: typeof place.geometry.location.lat === 'function'
			? place.geometry.location.lat()
			: place.geometry.location.lat,
		lng: typeof place.geometry.location.lng === 'function'
			? place.geometry.location.lng()
			: place.geometry.location.lng,
	},
	name: place.name,
	photos: place.photos?.map((p) => {
		if (p.photo_reference)
			return p.photo_reference;

		return p.getUrl?.() ?? '';
	}),
	placeId: place.place_id,
	rating: place.rating,
	types: place.types,
});
