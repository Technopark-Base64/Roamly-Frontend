import { getUserById } from './api/getUserById';
import { useCurrentUser } from './hooks/useCurrentUser';
import currentUserReducer from './lib/slices/CurrentUserStorage';
import { IUser } from './model/types/User';

export {
	useCurrentUser,
	currentUserReducer,
	getUserById,
};

export type {
	IUser
};
