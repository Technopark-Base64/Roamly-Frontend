import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/providers/StoreProvider';
import { IUser } from '../index';
import { clearCurrentUser, newCurrentUser } from '../lib/slices/CurrentUserStorage';
import { getCurrentUser } from '../model/selectors/getCurrentUser';


export const useCurrentUser = () => {
	const currentUser = useSelector((state: RootState) => getCurrentUser(state));
	const dispatch = useDispatch<AppDispatch>();

	const setCurrentUser = (user: IUser | null) => {
		console.log('setUser', user);
		if (user) {
			dispatch(newCurrentUser(user));
			return;
		}

		dispatch(clearCurrentUser());
	};

	return { currentUser, setCurrentUser };
};
