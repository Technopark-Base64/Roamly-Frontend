import React, { useState } from 'react';
import { useCurrentUser } from 'src/entities/User';
import cls from './style.module.scss';


export const LoginForm = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const { setCurrentUser } = useCurrentUser();


	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setCurrentUser({
			id: 0,
			login,
			email: '',
		});
	};

	const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value);
	};

	const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<div className={cls.error_message}>
				{ /* Error will be here */ }
			</div>

			<div className={cls.input_container} >
				<input
					className="shared-input"
					type="text"
					id="username"
					value={login}
					placeholder="Логин"
					onChange={handleLoginInput}
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

			<button type="submit" className="shared-button"> Вход </button>
		</form>
	);
};
