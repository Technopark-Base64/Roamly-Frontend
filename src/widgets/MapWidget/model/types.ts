import { IPlace } from 'src/entities/Place';

export interface IMapStorage {
  selectedPlace: IPlace | null,
  currentView: IPlace['location'],
  currentZoom: number,
}