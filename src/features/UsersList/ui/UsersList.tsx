import { useCurrentTrip } from 'src/entities/Trip';
import { IUser, useCurrentUser, UserCard, UserRole } from 'src/entities/User';
import { useUsersList } from '../hooks/useUsersList';
import cls from './style.module.scss';

interface IProps {
	users: IUser[];
}

export const UsersList = ({ users } :IProps) => {
	const { isOwner } = useCurrentTrip();
	const { currentUser } = useCurrentUser();
	const { DeleteUser, ChangeUserRole } = useUsersList();

	const handleChangeRole = (userId: number, newRole: UserRole) => {
		ChangeUserRole({
			member_id: userId,
			access: newRole,
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
							? (() => DeleteUser(user.id)) : undefined}
					/>
				)}
			</div>
		</div>
	);
};
