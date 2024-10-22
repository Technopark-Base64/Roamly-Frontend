import { useNavigate } from 'react-router-dom';
import cls from './style.module.scss';

export const Page404 = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/');
	};

	return (
		<div className={cls.page}>
			<div className={cls.title}>
				404 - Страница не найдена
			</div>
			<button className="shared-button" onClick={handleNavigate} >
				На главную
			</button>
		</div>
	);
};
