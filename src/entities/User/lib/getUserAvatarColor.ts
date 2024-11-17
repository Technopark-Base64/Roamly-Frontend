import { UserAvatarColors } from '../model/constants';
import { IUser } from '../model/types/User';

export const getUserAvatarColor = (user: IUser) => {
	const index = Number(user.id.toString().at(-1));

	return UserAvatarColors[index];
};