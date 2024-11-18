import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from 'src/shared/hooks/useFetch';
import { checkInvite } from '../api/checkInvite';
import cls from './style.module.scss';

export const InvitePage = () => {
	const navigate = useNavigate();
	const { token } = useParams();

	const {
		data,
		error,
	} = useFetch(checkInvite(token ?? ''));

	useEffect(() => {
		data && navigate(`/trip/${token}`);
	}, [data]);

	const handleNavigate = () => {
		navigate('/');
	};

	return (
		<div className={cls.page}>
			{error &&
				<>
					<div className={cls.title}>
						403 - Приглашение недействительно
					</div>
					<button className="shared-button" onClick={handleNavigate}>
						На главную
					</button>
				</>
			}
		</div>
	);
};
