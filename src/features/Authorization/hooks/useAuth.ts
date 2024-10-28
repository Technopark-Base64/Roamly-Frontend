import { useEffect, useState } from 'react';
import { useCurrentUser } from 'src/entities/User';
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

export const useAuth = ({ login = '', email = '', password = '' }: IProps) => {
	const { setCurrentUser } = useCurrentUser();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const defaultUser = {
		id: 1,
		login: 'Default User',
		email: 'A@A.COM',
	};

	const { data: isAuth, refetch: fetchCheckAuth, isFetching: isFetchingCheck, error: errorCheck } = useFetch<IAuthResponse>(requestCheckAuth());
	const { data: loginRes, refetch: fetchLogin, isFetching: isFetchingLogin, error: errorLogin } = useFetch<IAuthResponse>(requestLogin({ email, password }));
	const { data: signupRes, refetch: fetchSignup, isFetching: isFetchingSignup, error: errorSignup } = useFetch<IAuthResponse>(requestSignup({ email, password, login }));
	const { data: logoutRes, refetch: fetchLogout, isFetching: isFetchingLogout, error: errorLogout } = useFetch<IAuthResponse>(requestLogout());

	const Login = async () => {
		return await fetchLogin();
	};

	useEffect(() => {
		!!loginRes && setCurrentUser(defaultUser);
	}, [loginRes]);

	useEffect(() => {
		setIsLoading(isFetchingLogin);
	}, [isFetchingLogin]);

	useEffect(() => {
		setError(errorLogin);
	}, [errorLogin]);

	const Signup = async () => {
		return await fetchSignup();
	};

	useEffect(() => {
		!!signupRes && setCurrentUser(defaultUser);
	}, [signupRes]);

	useEffect(() => {
		setIsLoading(isFetchingSignup);
	}, [isFetchingSignup]);

	useEffect(() => {
		setError(errorSignup);
	}, [errorSignup]);

	const Logout = async () => {
		return await fetchLogout();
	};

	useEffect(() => {
		!!logoutRes && setCurrentUser(null);
	}, [logoutRes]);

	useEffect(() => {
		setIsLoading(isFetchingLogout);
	}, [isFetchingLogout]);

	useEffect(() => {
		setError(errorLogout);
	}, [errorLogout]);

	const CheckAuth = async () => {
		const result = await fetchCheckAuth();
		result ? setCurrentUser(defaultUser) : setCurrentUser(null);
		return result;
	};

	useEffect(() => {
		setIsLoading(isFetchingCheck);
	}, [isFetchingCheck]);

	useEffect(() => {
		setError(errorCheck);
	}, [errorCheck]);

	return { Login, Signup, Logout, CheckAuth, isLoading, error };
};