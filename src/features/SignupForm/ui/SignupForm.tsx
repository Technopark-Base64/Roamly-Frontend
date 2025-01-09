import React, { useState } from 'react';
import { useAuth } from 'src/features/Authorization';
import cls from './style.module.scss';

export const SignupForm = () => {
	const [login, setLogin] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repPassword, setRepPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [repPasswordError, setRepPasswordError] = useState('');
	const { Signup } = useAuth({ email, password, login });

	let emailTimeout: ReturnType<typeof setTimeout>;
	let passwordTimeout: ReturnType<typeof setTimeout>;
	let repPasswordTimeout: ReturnType<typeof setTimeout>;

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password: string) => {
		return password.length >= 5;
	};

	const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value);
		setLoginError('');
	};

	const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = event.target.value;
		setEmail(newEmail);
		clearTimeout(emailTimeout);
		emailTimeout = setTimeout(() => {
			if (!newEmail) {
				setEmailError('Email не может быть пустым.');
			} else if (!validateEmail(newEmail)) {
				setEmailError('Неверный формат email.');
			} else {
				setEmailError('');
			}
		}, 500);
	};

	const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = event.target.value;
		setPassword(newPassword);
		clearTimeout(passwordTimeout);
		passwordTimeout = setTimeout(() => {
			if (!newPassword) {
				setPasswordError('Пароль не может быть пустым.');
			} else if (!validatePassword(newPassword)) {
				setPasswordError('Пароль должен содержать не менее 5 символов.');
			} else {
				setPasswordError('');
			}
		}, 500);
	};

	const handleRepPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newRepPassword = event.target.value;
		setRepPassword(newRepPassword);
		clearTimeout(repPasswordTimeout);
		repPasswordTimeout = setTimeout(() => {
			if (newRepPassword !== password) {
				setRepPasswordError('Пароли не совпадают.');
			} else {
				setRepPasswordError('');
			}
		}, 500);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (loginError || emailError || passwordError || repPasswordError || !login || !email || !password || !repPassword) {
			return;
		}

		await Signup();
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<div className={cls.error_message}>
				{loginError && <span className={cls.error}>• {loginError}<br/></span>}
				{emailError && <span className={cls.error}>• {emailError}<br/></span>}
				{passwordError && <span className={cls.error}>• {passwordError}<br/></span>}
				{repPasswordError && <span className={cls.error}>• {repPasswordError}</span>}
			</div>

			<div className={cls.input_container}>
				<input
					className="shared-input"
					type="text"
					id="login"
					value={login}
					placeholder="Логин"
					onChange={handleLoginInput}
				/>
				<input
					className="shared-input"
					type="email"
					id="email"
					value={email}
					placeholder="Email"
					onChange={handleEmailInput}
				/>

				<input
					className="shared-input"
					type="password"
					id="password"
					value={password}
					placeholder="Пароль"
					onChange={handlePasswordInput}
				/>

				<input
					className="shared-input"
					type="password"
					id="rep-password"
					value={repPassword}
					placeholder="Повторите пароль"
					onChange={handleRepPasswordInput}
				/>
			</div>

			<button type="submit" className="shared-button shared-button-positive"> Регистрация </button>
		</form>
	);
};