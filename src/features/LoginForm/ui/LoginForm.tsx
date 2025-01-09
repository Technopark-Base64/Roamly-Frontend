import React, { useState } from 'react';
import { useAuth } from '../../Authorization';
import cls from './style.module.scss';

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const { Login } = useAuth({ email, password });
	let emailTimeout: ReturnType<typeof setTimeout>;
	let passwordTimeout: ReturnType<typeof setTimeout>;

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password: string) => {
		return password.length >= 5;
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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (emailError || passwordError || !email || !password) {
			return;
		}

		await Login();
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<div className={cls.error_message}>
				{emailError && <span className={cls.error}>• {emailError}<br/></span>}
				{passwordError &&  <span className={cls.error}>• {passwordError}</span>}
			</div>

			<div className={cls.input_container} >
				<input
					className="shared-input"
					type="text"
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
			</div>

			<button type="submit" className="shared-button shared-button-positive"> Вход </button>
		</form>
	);
};
