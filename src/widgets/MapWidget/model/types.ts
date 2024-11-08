export interface IMarker {
  id: string,
  title?: string,
  location: {
    lat: number,
    lng: number,
  },
}

export interface IMapStorage {
  markers: IMarker[],
  selectedId: string,
  currentView: {
    lat: number,
    lng: number,
  },
  currentZoom: number,
}
