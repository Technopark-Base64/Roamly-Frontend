import { getUserById } from './api/getUserById';
import { useCurrentUser } from './hooks/useCurrentUser';
import { getUserAvatarColor } from './lib/getUserAvatarColor';
import currentUserReducer from './lib/slices/CurrentUserStorage';
import { IUser, UserRole } from './model/types/User';
import { UserCard } from './ui/UserCard';

export {
	useCurrentUser,
	currentUserReducer,
	getUserAvatarColor,
	getUserById,
	UserCard,
	UserRole,
};

export type {
	IUser
};
