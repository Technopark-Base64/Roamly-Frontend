import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TripsList } from 'src/widgets/TripsList';
import { TripForm } from 'src/features/TripForm';
import { ModalWrapper } from 'src/shared/components/ModalWrapper/ui/ModalWrapper';
import cls from './style.module.scss';

const SCREENS = ['', 'passed', 'mine', 'shared'];

export const MainPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const menu = location.hash.replace('#', '');
	
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (!SCREENS.includes(menu))
			navigate(`${location.pathname}`, { replace: true });
	}, [menu]);

	let menuLabel;
	switch (menu) {
	case 'passed':
		menuLabel = 'Прошедшие поездки';
		break;
	case 'mine':
		menuLabel = 'Мои поездки';
		break;
	case 'shared':
		menuLabel = 'Поездки по приглашению';
		break;
	default:
		menuLabel = 'Активные поездки';
	}

	return (
		<div className={cls.page}>

			{showModal &&
				<ModalWrapper onClose={() => setShowModal(false)} >
					<TripForm prevTrip={null} />
				</ModalWrapper>
			}

			<div className={cls.content}>
				<div className={cls.titleContainer}>
					<div className={cls.title}>
						{ menuLabel }
					</div>

					<div>
						<button className="shared-button shared-button-positive" onClick={() => setShowModal(true)} >
							<LibraryAddOutlinedIcon /> Новая
						</button>
					</div>
				</div>

				<TripsList filter={menu} onCreateNewTrip={() => setShowModal(true)} />
			</div>

			<div className={cls.menu}>
				По времени
				<button
					className={`shared-button ${menu === '' && 'shared-button-active'}`}
					onClick={() => navigate(`${location.pathname}`)}
				>
					Активные
				</button>
				<button
					className={`shared-button ${menu === 'passed' && 'shared-button-active'}`}
					onClick={() => navigate(`${location.pathname}#passed`)}
				>
					Прошедшие
				</button>
				По авторству
				<button
					className={`shared-button ${menu === 'mine' && 'shared-button-active'}`}
					onClick={() => navigate(`${location.pathname}#mine`)}
				>
					Созданные мной
				</button>
				<button
					className={`shared-button ${menu === 'shared' && 'shared-button-active'}`}
					onClick={() => navigate(`${location.pathname}#shared`)}
				>
					По приглашению
				</button>
			</div>

		</div>
	);
};
