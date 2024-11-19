import { useCurrentTrip } from 'src/entities/Trip';
import { IUser, useCurrentUser, UserCard } from 'src/entities/User';
import cls from './style.module.scss';

interface IProps {
	users: IUser[];
}

export const UsersList = ({ users } :IProps) => {
	const { isOwner } = useCurrentTrip();
	const { currentUser } = useCurrentUser();

	const handleChangeRole = (userId: number, newRole: string) => {
		console.log(`Changed ${userId} to ${newRole}`);
	};

	const handleDeleteUser = (userId: number) => {
		console.log(`Deleted ${userId}`);
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
							? ((newRole: string) => handleChangeRole(user.id, newRole)) : undefined}
						onDeleteUser={(isOwner && user.id !== currentUser?.id) || (!isOwner && user.id === currentUser?.id)
							? (() => handleDeleteUser(user.id)) : undefined}
					/>
				)}
			</div>
		</div>
	);
};
