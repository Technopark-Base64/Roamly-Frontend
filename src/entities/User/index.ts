import { getUserById } from './api/getUserById';
import { useCurrentUser } from './hooks/useCurrentUser';
import currentUserReducer from './lib/slices/CurrentUserStorage';
import { IUser, UserRole } from './model/types/User';

export {
	useCurrentUser,
	currentUserReducer,
	getUserById,
	UserRole
};

export type {
	IUser
};
