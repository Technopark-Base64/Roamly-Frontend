import React, { useState } from 'react';
import { useAuth } from '../../Authorization';
import cls from './style.module.scss';


export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { Login } = useAuth({ email, password });
	
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await Login();
	};

	const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
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
					id="email"
					value={email}
					placeholder="Email"
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
