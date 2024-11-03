export interface INotification {
  error: boolean,
  message: string
}

export interface INotificationStorage {
  notifications: Array<INotification & { id: number }>,
  currentId: number,
}
