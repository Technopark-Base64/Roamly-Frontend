import React, { useState } from 'react';
import { useAuth } from 'src/features/Authorization';
import cls from './style.module.scss';


export const SignupForm = () => {
	const [login, setLogin] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repPassword, setRepPassword] = useState('');

	const { Signup } = useAuth({ email, password, login });

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (password !== repPassword)
			return;

		const result = await Signup();
		console.log(result);
	};

	const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value);
	};

	const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleRepPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRepPassword(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<div className={cls.error_message}>
				{ /* Error will be here */ }
				{password !== repPassword && 'Passwords are not equal'}
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

			<button type="submit" className="shared-button"> Регистрация </button>
		</form>
	);
};
