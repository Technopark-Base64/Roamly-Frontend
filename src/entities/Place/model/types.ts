export interface IPlace {
  formattedAddress: string,
  location: {
    lat: number,
    lng: number,
  },
  name: string,
  photos: string [],
  placeId: string,
  rating: number,
  types: string[],
}

export interface IPlaceResponse {
  formatted_address: string,
  geometry: {
    location: {
      lat: number | (() => number),
      lng: number | (() => number),
    },
  },
  name: string,
  photos: {
    photo_reference?: string,
    getUrl?: () => string,
  } [],
  place_id: string,
  rating: number,
  types: string[],
  vicinity?: string,
}
