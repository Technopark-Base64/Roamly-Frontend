import React, { MouseEvent, useEffect, useState } from 'react';
import { IPlace, searchArea } from 'src/entities/Place';
import { ITrip } from 'src/entities/Trip';
import { Input } from 'src/shared/components/Input';
import { useFetch } from 'src/shared/hooks/useFetch';
import { defaultTripName } from 'src/shared/lang';
import { useNotificationService } from 'src/shared/services/notifications';
import { dateGreater } from 'src/shared/utils';
import { useDeleteTrip } from '../hooks/useDeleteTrip';
import { useUpdateCreateTrip } from '../hooks/useUpdateCreateTrip';
import cls from './style.module.scss';

interface IProps {
	prevTrip: ITrip | null;
}

export const TripForm = ({ prevTrip }: IProps) => {
	const [search, setSearch] = useState(prevTrip?.area.name ?? '');
	const [selectedRegion, setSelectedRegion] = useState<IPlace | undefined>(prevTrip?.area);
	const [startDate, setStartDate] = useState<string | undefined>(prevTrip?.startTime.toISOString().slice(0, 10));
	const [endDate, setEndDate] = useState<string | undefined>(prevTrip?.endTime.toISOString().slice(0, 10));

	const namePlaceholder = defaultTripName(selectedRegion?.name);

	const [tripName, setTripName] = useState<string>(prevTrip?.name ?? '');

	const { Notify } = useNotificationService();
	const { DeleteTrip } = useDeleteTrip(prevTrip?.id ?? '');
	const { UpdateTrip, CreateTrip } = useUpdateCreateTrip({
		id: prevTrip?.id ?? '',
		name: tripName,
		defaultName: namePlaceholder,
		start_time: startDate ?? '',
		end_time: endDate ?? '',
		area_id: selectedRegion?.placeId ?? ''
	});

	const {
		data,
		error,
		refetch,
	} = useFetch<IPlace[]>(searchArea(search));

	useEffect(() => {
		search && !prevTrip && refetch();
	}, [search]);

	const handleClickRegion = () => {
		data && setSelectedRegion(data[0]);
	};

	const handleCancelSelect = (e: MouseEvent) => {
		e.stopPropagation();
		setSelectedRegion(undefined);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTripName(e.target.value);
	};

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (endDate && dateGreater(e.target.value, endDate)) {
			setStartDate(endDate);
			return;
		}
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (startDate && dateGreater(startDate, e.target.value)) {
			setEndDate(startDate);
			return;
		}
		const now = new Date().toISOString().slice(0, 10);
		if (dateGreater(now, e.target.value)) {
			setEndDate(now);
			return;
		}
		setEndDate(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedRegion || !startDate || !endDate)
			return;

		let res: boolean;

		if (!prevTrip)
			res = !!(await CreateTrip());
		else
			res = !!(await UpdateTrip());

		res && Notify({
			error: false,
			message: `Поездка успешно ${prevTrip ? 'обновлена' : 'создана'}`,
		});
	};

	return (
		<form className={cls.form} onSubmit={handleSubmit}>
			<div className={cls.title}>
				{prevTrip ? 'Изменить поездку' : 'Новая поездка'}
			</div>

			<div className={cls.regionContainer}>
				<span className={cls.hintLabel}> Название поездки </span>
				<input
					className="shared-input"
					placeholder={namePlaceholder}
					value={tripName}
					onInput={handleNameChange}
				/>
			</div>

			<div className={cls.regionContainer}>
				{!prevTrip && <span className={cls.hintLabel}> Выберите город </span>}

				{!selectedRegion &&
					<Input
						initValue={search}
						placeholder="Найдите город"
						delay={300}
						onChange={setSearch}
					/>
				}

				{!error && !!data?.length && search &&
					<div
						className={`${cls.regionShow} ${!selectedRegion && cls.pointer}`}
						onClick={handleClickRegion}
					>
						{ data[0].name }

						{selectedRegion &&
							<div className={cls.cancelBtn} onClick={handleCancelSelect}>
								x
							</div>
						}
					</div>
				}

				{prevTrip &&
					<div className={`${cls.regionShow} ${cls.block}`}>
						{ prevTrip.area.name }
					</div>
				}

				{error &&
					<div className={cls.regionShow}>
						<span className={cls.errLabel}>
							{ error }
						</span>
					</div>
				}

			</div>

			<div className={cls.dateContainer}>
				<div className={cls.dateForm}>
					Начало
					<input type="date" value={startDate} onChange={handleStartDateChange}/>
				</div>

				<div className={cls.dateForm}>
					Конец
					<input type="date" value={endDate} onChange={handleEndDateChange} />
				</div>
			</div>

			<button type="submit" className="shared-button"> {prevTrip ? 'Сохранить' :'Создать'} </button>
			{ prevTrip && <button type="button" className="shared-button shared-button-red" onClick={DeleteTrip}> Удалить </button> }
		</form>
	);
};