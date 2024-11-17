import { useState } from 'react';
import { UserRoleLabel } from 'src/shared/lang';
import { getUserAvatarColor } from '../lib/getUserAvatarColor';
import { IUser, UserRole } from '../model/types/User';
import cls from './style.module.scss';

interface IProps {
  user: IUser,
	// eslint-disable-next-line no-unused-vars
	onChangeRole?: (newRole: string) => void,
	onDeleteUser?: () => void,
}

export const UserCard = ({ user, onDeleteUser, onChangeRole }: IProps) => {
	const [showChangeMenu, setShowChangeMenu] = useState(false);

	const avatarStyle = {
		backgroundColor: getUserAvatarColor(user),
	};

	const handleOpenMenu = () => {
		setShowChangeMenu(true);

		window.addEventListener('click', () => {
			setTimeout(() => setShowChangeMenu(false));
		}, { once: true, capture: true });
	};

	return (
		<div className={cls.card}>
			<div className={cls.avatar} style={avatarStyle} />

			<div className={cls.name}>
				{user.login}
			</div>

			<div className={cls.buttonContainer}>
				<button className="shared-button" onClick={onChangeRole && handleOpenMenu}>
					Роль: {user.role && UserRoleLabel[user.role]}
				</button>
				{onDeleteUser &&
					<div className={`shared-button-red ${cls.deleteBtn}`} onClick={onDeleteUser}>
						Уд
					</div>
				}

				{showChangeMenu &&
					<div className={cls.changeMenu}>
						<div className={cls.menuItem} onClick={() => onChangeRole?.(UserRole.Readonly)}>
							{UserRoleLabel[UserRole.Readonly]} {user.role === UserRole.Readonly && <div>V</div>}
						</div>
						<div className={cls.menuItem} onClickCapture={() => onChangeRole?.(UserRole.Editor)}>
							{UserRoleLabel[UserRole.Editor]} {user.role === UserRole.Editor && <div>V</div>}
						</div>
					</div>
				}
			</div>
		</div>
	);
};
