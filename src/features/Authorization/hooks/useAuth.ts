import { useEffect, useState } from 'react';
import { getUserById, IUser, useCurrentUser } from 'src/entities/User';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
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
	id: 1,
	login: 'loading...',
	email: '',
};

export const useAuth = ({ login = '', email = '', password = '' }: IProps) => {
	const { setCurrentUser } = useCurrentUser();
	const { Notify } = useNotificationService();

	const [error, setError] = useState<string | null>(null);
	const [userId, setUserId] = useState<number | null>(null);

	const { data: fetchedUser, refetch: fetchUser, error: errorUser } = useFetch<IUser>(getUserById(userId ?? 0));

	useEffect(() => {
		userId && fetchUser();
	}, [userId]);

	useEffect(() => {
		setError(errorUser);
	}, [errorUser]);

	useEffect(() => {
		fetchedUser && setCurrentUser(fetchedUser);
	}, [fetchedUser]);

	useEffect(() => {
		error && Notify({
			error: true,
			message: error,
		});
	}, [error]);

	const { data: checkRes, refetch: fetchCheckAuth } = useFetch<IAuthResponse>(requestCheckAuth());
	const { data: loginRes, refetch: fetchLogin, error: errorLogin } = useFetch<IAuthResponse>(requestLogin({ email, password }));
	const { data: signupRes, refetch: fetchSignup, error: errorSignup } = useFetch<IAuthResponse>(requestSignup({ email, password, login }));
	const { data: logoutRes, refetch: fetchLogout, error: errorLogout } = useFetch<IAuthResponse>(requestLogout());

	const Login = async () => {
		return await fetchLogin();
	};

	useEffect(() => {
		if (loginRes) {
			setUserId(loginRes.user_id);
			setCurrentUser(defaultUser);
		}
	}, [loginRes]);

	useEffect(() => {
		setError(errorLogin);
	}, [errorLogin]);

	const Signup = async () => {
		return await fetchSignup();
	};

	useEffect(() => {
		if (signupRes) {
			setUserId(signupRes.user_id);
			setCurrentUser(defaultUser);
		}
	}, [signupRes]);

	useEffect(() => {
		setError(errorSignup);
	}, [errorSignup]);

	const Logout = async () => {
		return await fetchLogout();
	};

	useEffect(() => {
		if (logoutRes) {
			setCurrentUser(null);
		}
	}, [logoutRes]);

	useEffect(() => {
		setError(errorLogout);
	}, [errorLogout]);

	const CheckAuth = async () => {
		const res = await fetchCheckAuth();
		if (res)
			setCurrentUser(defaultUser);

		return res;
	};

	useEffect(() => {
		if (checkRes) {
			setUserId(checkRes.user_id);
		}
	}, [checkRes]);

	return { Login, Signup, Logout, CheckAuth, error };
};