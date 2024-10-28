import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TripsList } from 'src/widgets/TripsList';
import { NewTripForm } from 'src/features/NewTripForm';
import { ModalWrapper } from 'src/shared/components/ModalWrapper/ui/ModalWrapper';
import cls from './style.module.scss';

export const MainPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const menu = location.hash.replace('#', '');
	
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (menu !== 'passed')
			navigate(`${location.pathname}`, { replace: true });
	}, [menu]);

	return (
		<div className={cls.page}>

			{showModal &&
				<ModalWrapper onClose={() => setShowModal(false)} >
					<NewTripForm prevTrip={null} />
				</ModalWrapper>
			}

			<div className={cls.content}>
				<div className={cls.titleContainer}>
					<div className={cls.title}>
						{menu === 'passed' ? 'Прошедшие' : 'Активные'} поездки
					</div>

					<div>
						<button className="shared-button" onClick={() => setShowModal(true)} >
							Новая
						</button>
					</div>
				</div>

				<TripsList showPast={menu === 'passed'} />
			</div>

			<div className={cls.menu}>
				<button className="shared-button" onClick={() => navigate(`${location.pathname}`)}> Активные </button>
				<button className="shared-button" onClick={() => navigate(`${location.pathname}#passed`)}> Прошедшие </button>
			</div>

		</div>
	);
};
