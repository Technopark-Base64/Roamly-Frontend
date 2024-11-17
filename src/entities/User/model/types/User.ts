export enum UserRole {
  Owner = 'owner',
  Editor = 'editor',
  Readonly = 'readonly',
}

export interface IUser {
  id: number,
  login: string,
  email: string,
  role?: UserRole,
  imageUrl?: string,
}
