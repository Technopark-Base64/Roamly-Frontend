export enum WSActions {
  // eslint-disable-next-line no-unused-vars
  TripUpdate = 'trip_update',
  // eslint-disable-next-line no-unused-vars
  PlacesUpdate = 'trip_places_update',
  // eslint-disable-next-line no-unused-vars
  EventsUpdate = 'trip_events_update',
  // eslint-disable-next-line no-unused-vars
  UsersUpdate = 'trip_users_update',
}

export interface IWebSocketMessage {
  action: WSActions,
  author: number,
  trip_id: string,
  message: string,
}

// eslint-disable-next-line no-unused-vars
export type TMessageHandler = (message: IWebSocketMessage) => void;
