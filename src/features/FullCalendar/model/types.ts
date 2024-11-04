export interface ICalendarEvent {
  title?: string,
  start: Date,
  end: Date,
  display?: string,
  allDay?: boolean,
  backgroundColor?: string,
  textColor?: string,
}
