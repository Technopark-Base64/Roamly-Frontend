export enum UserRole {
  // eslint-disable-next-line no-unused-vars
  Owner = 'owner',
  // eslint-disable-next-line no-unused-vars
  Editor = 'editor',
  // eslint-disable-next-line no-unused-vars
  Reader = 'reader',
}

export interface IUser {
  id: number,
  login: string,
  email: string,
  role?: UserRole,
  imageUrl?: string,
}
