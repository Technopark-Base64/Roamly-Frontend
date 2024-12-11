import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EventForm } from 'src/features/EventForm';
import { FullCalendar } from 'src/features/FullCalendar';
import { IEvent } from 'src/entities/Event';
import { EVENT_PLACECARD_HEIGHT, EventPlaceCard } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { ModalWrapper } from 'src/shared/components/ModalWrapper';
import { useDialogService } from 'src/shared/services/dialog';
import { useMapWidget } from '../../MapWidget';
import { useAutoSchedule } from '../hooks/useAutoSchedule';
import cls from './style.module.scss';

interface IProps {
	events: IEvent[],
}

export const CalendarWidget = ({ events }: IProps) => {
	const { currentTrip, isReader } = useCurrentTrip();
	const { selectedId, selectPlace } = useMapWidget();
	const { AutoSchedule, LoadingSchedule } = useAutoSchedule();
	const { OpenDialog } = useDialogService();
	const [eventToEdit, setEventToEdit] = useState<IEvent | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [showMenu, setShowMenu] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const listRef = useRef<HTMLDivElement | null>(null);

	const handleGoToRecoms = () => {
		navigate(`${location.pathname}#recoms`);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setEventToEdit(null);

		// Костыль! но по другому не придумал
		selectPlace(selectedId + ' ');
	};

	const handleAutoSchedule = () => {
		OpenDialog({
			icon: <AutoAwesomeOutlinedIcon/>,
			text: 'Авто-планирование с ИИ',
			subtext: 'Примем в расчет за Вас время работы заведений, их расположение и построим оптимальный маршрут',
			warning: 'Внимание! Данная функция сотрет все события в календаре, будьте осторожны!',
			onAccept: AutoSchedule,
			acceptText: 'Продолжить',
			cancelText: 'Отмена',
		});
	};

	useEffect(() => {
		listRef.current?.scrollTo(0, ((currentTrip?.places.findIndex((pl) => pl.placeId === selectedId) ?? 0) - 2) * EVENT_PLACECARD_HEIGHT);
	}, []);

	return (
		<>
			<div className={cls.content}>
				{!currentTrip?.places.length && !events.length &&
					<div className={cls.emptyLabel}>
						Сначала выберите места, которые хотите посетить
						<button className="shared-button" onClick={handleGoToRecoms}>
							Перейти в Рекомендации
						</button>
					</div>
				}

				{ LoadingSchedule && <LoadingScreen message="Создание плана поездки..." /> }

				{(showModal || eventToEdit) &&
					<ModalWrapper onClose={handleCloseModal}>
						<EventForm prevEvent={eventToEdit} onSuccess={handleCloseModal}/>
					</ModalWrapper>
				}

				{(!!currentTrip?.places.length || !!events.length) && !LoadingSchedule &&
					<>
						{showMenu &&
							<div className={cls.leftMenu}>
								{!isReader &&
									<div className={cls.buttonsContainer}>
										<button className="shared-icon-button" onClick={() => setShowModal(true)}>
											<AddOutlinedIcon/>
										</button>
										<button className="shared-button shared-button-blue" onClick={handleAutoSchedule}> Авто-планирование </button>
									</div>
								}
								<div className={cls.listContainer} ref={listRef}>
									{currentTrip?.places.map((place) => (
										<EventPlaceCard
											place={place}
											selected={place.placeId === selectedId}
											draggable={!isReader}
											onClick={() => selectPlace(place.placeId === selectedId ? '' : place.placeId)}
											key={place.placeId}
										/>
									))}
								</div>
								<button className="shared-button" onClick={() => setShowMenu(false)}>
									<KeyboardDoubleArrowLeftOutlinedIcon/> Свернуть
								</button>
							</div>
						}

						<FullCalendar
							events={events}
							views={['timeGridWeek', 'dayGridMonth']}
							selectedPlace={selectedId}
							onShowMenu={!showMenu ? () => setShowMenu(true) : undefined}
							onClickEvent={setEventToEdit}
						/>
					</>
				}
			</div>
		</>
	);
};
