import { IPlace, IPlaceResponse } from '../model/types';

export const mapResponseToPlace = (place: IPlaceResponse): IPlace => ({
	formattedAddress: place.formatted_address,
	location: place.geometry.location,
	name: place.name,
	photos: place.photos.map((p) => p.photo_reference),
	placeId: place.place_id,
	rating: place.rating,
	types: place.types,
});
