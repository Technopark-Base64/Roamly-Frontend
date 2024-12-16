import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from 'src/shared/hooks/useFetch';
import { joinTrip } from '../api/joinTrip';
import { IJoinTripResponse } from '../model/types';
import cls from './style.module.scss';

export const JoinPage = () => {
	const navigate = useNavigate();
	const { token } = useParams();

	const {
		data,
		error,
	} = useFetch<IJoinTripResponse>(joinTrip(token ?? ''));

	useEffect(() => {
		data && navigate(`/trip/${data.trip_id}`);
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
					<button className="shared-button shared-button-active" onClick={handleNavigate}>
						На главную
					</button>
				</>
			}
		</div>
	);
};
