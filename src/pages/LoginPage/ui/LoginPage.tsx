import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from 'src/features/LoginForm';
import { SignupForm } from 'src/features/SignupForm';
import { BACKGROUNDS } from 'src/shared/assets/links';
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
		<>
			<img src={BACKGROUNDS[0]} className={cls.background} />
			<div className={cls.bgFade} />
			<div className={cls.page}>
				<div className={cls.landingContainer}>
					<div className={cls.titleContainer}>
						<div className={cls.title}>
							Roamly
						</div>
						<div className={cls.subtitle}>
							Планируйте меньше, путешествуйте больше
						</div>
					</div>
					<div className={cls.infoContainer}>
						Больше, чем просто планировщик. Roamly - это ваш личный помощник в мире путешествий.
						Интеллектуальные маршруты, подбор достопримечательностей и оптимальное расписание
						– все это в одном сервисе. Попробуйте!
					</div>
				</div>

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
		</>
	);
};
