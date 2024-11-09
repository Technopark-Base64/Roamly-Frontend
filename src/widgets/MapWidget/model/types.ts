export interface IMarker {
  id: string,
  title?: string,
  location: {
    lat: number,
    lng: number,
  },
}

export type TCircle = {
  center: {
    lat: number,
    lng: number,
  },
  radius: number,
}

export interface IMapStorage {
  markers: IMarker[],
  isRoute: boolean,
  selectedId: string,
  currentView: {
    lat: number,
    lng: number,
  },
  currentZoom: number,
  circle: TCircle | null,
}
