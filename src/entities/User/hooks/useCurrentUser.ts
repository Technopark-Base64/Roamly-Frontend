import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/app/providers/StoreProvider';
import { IUser } from '../index';
import { clearCurrentUser, newCurrentUser } from '../lib/slices/CurrentUserStorage';
import { getCurrentUser } from '../model/selectors/getCurrentUser';


export const useCurrentUser = () => {
	const currentUser = useSelector(getCurrentUser);
	const dispatch = useDispatch<AppDispatch>();

	const setCurrentUser = (user: IUser | null) => {
		if (user) {
			dispatch(newCurrentUser(user));
			return;
		}

		dispatch(clearCurrentUser());
	};

	return { currentUser, setCurrentUser };
};
