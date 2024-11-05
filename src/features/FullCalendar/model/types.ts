export interface ICalendarEvent {
  id: string,
  title?: string,
  start: Date,
  end: Date,
  display?: string,
  allDay?: boolean,
  backgroundColor?: string,
  textColor?: string,
}
