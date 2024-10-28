import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from 'src/features/LoginForm';
import { SignupForm } from 'src/features/SignupForm';
import cls from './style.module.scss';

export const LoginPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const selected = location.hash.replace('#', '');

	const handleSelectLogin = () => {
		navigate('/login');
	};

	const handleSelectSignup = () => {
		navigate('/login#signup');
	};

	return (
		<div className={cls.page}>
			<div className={cls.auth_window}>
				<div className={cls.title}>
					Добро пожаловать!
				</div>

				<div className={cls.button_container}>
					<button
						className={`shared-button ${selected === '' && 'shared-button-active'}`}
						onClick={handleSelectLogin}
					>
						Вход
					</button>

					<button
						className={`shared-button ${selected === 'signup' && 'shared-button-active'}`}
						onClick={handleSelectSignup}
					>
						Регистрация
					</button>
				</div>

				{ selected === 'signup'
					? <SignupForm />
					: <LoginForm />
				}
			</div>
		</div>
	);
};
