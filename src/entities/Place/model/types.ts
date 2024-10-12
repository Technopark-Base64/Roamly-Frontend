import { TPlacePhoto } from '../../PlacePhoto';

export interface IPlace {
  formatted_address: string,
  geometry: {
    location: {
      lat: number,
      lng: number,
    },
  },
  name: string,
  photos: TPlacePhoto[],
  place_id: string,
  types: string[],
}