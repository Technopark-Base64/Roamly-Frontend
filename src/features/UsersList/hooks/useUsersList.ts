import { useEffect, useState } from 'react';
import { useCurrentTrip } from 'src/entities/Trip';
import { UserRole } from 'src/entities/User';
import { useFetch } from 'src/shared/hooks/useFetch';
import { changeUserRole } from '../api/changeUserRole';
import { deleteUser } from '../api/deleteUser';

interface IUserInfo {
  member_id: number,
  access: UserRole,
}

export const useUsersList = () => {
	const { currentTrip, setCurrentTripUsers } = useCurrentTrip();
	const users = currentTrip?.users ?? [];

	const [userDeleteInfo, DeleteUser] = useState<number>(0);
	const [userUpdateInfo, ChangeUserRole] = useState<IUserInfo>({
		member_id: 0,
		access: UserRole.Reader,
	});

	const {
		refetch: changeRoleRefetch,
	} = useFetch(changeUserRole({
		...userUpdateInfo,
		trip_id: currentTrip?.id ?? '',
	}));

	const {
		refetch: deleteRefetch,
	} = useFetch(deleteUser({
		member_id: userDeleteInfo,
		trip_id: currentTrip?.id ?? '',
	}));

	useEffect(() => {
		if (!userDeleteInfo)
			return;

		deleteRefetch().then((res) => {
			if (res)
				setCurrentTripUsers(users.filter((u) => u.id !== userDeleteInfo));
		});
	}, [userDeleteInfo]);

	useEffect(() => {
		if (!userUpdateInfo.member_id)
			return;

		changeRoleRefetch().then((res) => {
			if (res)
				setCurrentTripUsers(users.map((u) => {
					if (u.id === userUpdateInfo.member_id)
						return {
							...u,
							role: userUpdateInfo.access,
						};
					return u;
				}));
		});
	}, [userUpdateInfo]);

	return { ChangeUserRole, DeleteUser };
};
