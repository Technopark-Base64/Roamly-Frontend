import { IUser } from '../../index';


export interface ICurrentUserStorage {
  user: IUser | null,
}
