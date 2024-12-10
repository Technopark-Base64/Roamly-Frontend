import { useEffect, useState } from 'react';
import { getUserById, IUser, useCurrentUser } from 'src/entities/User';
import { useFetch } from 'src/shared/hooks/useFetch';
import { requestCheckAuth } from '../api/check';
import { requestLogin } from '../api/login';
import { requestLogout } from '../api/logout';
import { requestSignup } from '../api/signup';
import { IAuthResponse } from '../model/types';

interface IProps {
	login?: string,
	email?: string,
	password?: string,
}

const defaultUser = {
	id: 0,
	login: '',
	email: '',
};

export const useAuth = ({ login = '', email = '', password = '' }: IProps) => {
	const { setCurrentUser } = useCurrentUser();

	const [userId, setUserId] = useState<number | null>(null);

	const { data: fetchedUser, refetch: fetchUser } = useFetch<IUser>(getUserById(userId ?? 0));

	useEffect(() => {
		userId && fetchUser();
	}, [userId]);

	useEffect(() => {
		fetchedUser && setCurrentUser(fetchedUser);
	}, [fetchedUser]);

	const { refetch: fetchCheckAuth } = useFetch<IAuthResponse>(requestCheckAuth());
	const { data: loginRes, refetch: fetchLogin } = useFetch<IAuthResponse>(requestLogin({ email, password }));
	const { data: signupRes, refetch: fetchSignup } = useFetch<IAuthResponse>(requestSignup({ email, password, login }));
	const { data: logoutRes, refetch: fetchLogout } = useFetch<IAuthResponse>(requestLogout());

	const Login = async () => {
		return await fetchLogin();
	};

	useEffect(() => {
		if (loginRes) {
			setUserId(loginRes.user_id);
		}
	}, [loginRes]);

	const Signup = async () => {
		return await fetchSignup();
	};

	useEffect(() => {
		if (signupRes) {
			setUserId(signupRes.user_id);
		}
	}, [signupRes]);

	const Logout = async () => {
		return await fetchLogout();
	};

	useEffect(() => {
		if (logoutRes) {
			setCurrentUser(null);
		}
	}, [logoutRes]);

	const CheckAuth = async () => {
		const res = await fetchCheckAuth();
		if (res) {
			setUserId(res.user_id);
			setCurrentUser({
				...defaultUser,
				id: res.user_id,
			});
		}

		return res;
	};

	return { Login, Signup, Logout, CheckAuth };
};