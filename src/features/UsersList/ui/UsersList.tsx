import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useCurrentTrip } from 'src/entities/Trip';
import { IUser, useCurrentUser, UserCard, UserRole } from 'src/entities/User';
import { useDialogService } from 'src/shared/services/dialog';
import { useUsersList } from '../hooks/useUsersList';
import cls from './style.module.scss';

interface IProps {
	users: IUser[];
}

export const UsersList = ({ users } :IProps) => {
	const { isOwner } = useCurrentTrip();
	const { currentUser } = useCurrentUser();
	const { OpenDialog } = useDialogService();
	const { DeleteUser, ChangeUserRole } = useUsersList();

	const handleChangeRole = (userId: number, newRole: UserRole) => {
		ChangeUserRole({
			member_id: userId,
			access: newRole,
		});
	};

	const handleDeleteTrip = (id: number, name: string) => {
		OpenDialog({
			icon: <DeleteOutlineOutlinedIcon/>,
			text: 'Удаление участника',
			subtext: `Пользователь ${name} больше не сможет видеть и редактировать поездку`,
			onAccept: () => DeleteUser(id),
			acceptText: 'Удалить',
			cancelText: 'Отмена',
			isDangerous: true,
		});
	};

	return (
		<div className={cls.container}>
			<div className={cls.title}>
				Участники поездки
			</div>

			<div className={cls.listContainer}>
				{users.map((user) =>
					<UserCard
						user={user}
						key={user.id}
						onChangeRole={isOwner && user.id !== currentUser?.id
							? ((newRole: UserRole) => handleChangeRole(user.id, newRole)) : undefined}
						onDeleteUser={(isOwner && user.id !== currentUser?.id) || (!isOwner && user.id === currentUser?.id)
							? (() => handleDeleteTrip(user.id, user.login)) : undefined}
					/>
				)}
			</div>
		</div>
	);
};
