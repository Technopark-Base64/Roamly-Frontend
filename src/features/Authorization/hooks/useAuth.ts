import { useEffect, useState } from 'react';
import { useCurrentUser } from 'src/entities/User';
import { useFetch } from 'src/shared/hooks/useFetch';
import { requestCheckAuth } from '../api/check';
import { requestLogin } from '../api/login';
import { requestSignup } from '../api/signup';
import { IAuthResponse } from '../model/types';

interface IProps {
	login?: string,
	email?: string,
	password?: string,
}

export const useAuth = ({ login = '', email = '', password = '' }: IProps) => {
	const { currentUser, setCurrentUser } = useCurrentUser();

	const [userId, setUserId] = useState<number>(currentUser ? currentUser.id : 0);

	useEffect(() => {
		if (!userId) {
			setCurrentUser(null);
			return;
		}
		if (currentUser)
			return;
		setCurrentUser({
			id: userId,
			login: 'Default User',
			email: 'A@A.COM',
		});
	}, [userId]);

	const { data: isAuth, refetch: fetchCheckAuth } = useFetch<IAuthResponse>(requestCheckAuth());
	const { data: loginRes, refetch: fetchLogin } = useFetch<IAuthResponse>(requestLogin({ email, password }));
	const { data: signupRes, refetch: fetchSignup } = useFetch<IAuthResponse>(requestSignup({ email, password, login }));
	const { data: logoutRes, refetch: fetchLogout } = useFetch<IAuthResponse>(requestCheckAuth());

	const Login = async () => {
		return await fetchLogin();
	};

	useEffect(() => {
		loginRes && setUserId(loginRes.user_id);
	}, [loginRes]);

	const Signup = async () => {
		return await fetchSignup();
	};

	useEffect(() => {
		signupRes && setUserId(signupRes.user_id);
	}, [signupRes]);

	const Logout = async () => {
		return await fetchLogout();
	};

	useEffect(() => {
		logoutRes && setUserId(0);
	}, [logoutRes]);

	const CheckAuth = async () => {
		return await fetchCheckAuth();
	};

	useEffect(() => {
		isAuth ? setUserId(isAuth.user_id) : setUserId(0);
	}, [isAuth]);

	return { Login, Signup, Logout, CheckAuth };
};