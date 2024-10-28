import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPlace, searchArea } from 'src/entities/Place';
import { ITrip } from 'src/entities/Trip';
import { Input } from 'src/shared/components/Input';
import { useFetch } from 'src/shared/hooks/useFetch';
import { stringDateGreater } from 'src/shared/utils';
import { deleteTrip } from '../api/deleteTrip';
import { newTrip } from '../api/newTrip';
import { updateTrip } from '../api/updateTrip';
import { INewTripResponse } from '../model/types';
import cls from './style.module.scss';

interface IProps {
	prevTrip: ITrip | null;
}

export const NewTripForm = ({ prevTrip }: IProps) => {
	const navigate = useNavigate();
	const [search, setSearch] = useState(prevTrip?.area.name ?? '');
	const [selectedRegion, setSelectedRegion] = useState<IPlace | undefined>(prevTrip?.area);
	const [startDate, setStartDate] = useState<string | undefined>(prevTrip?.startTime.toISOString().slice(0, 10));
	const [endDate, setEndDate] = useState<string | undefined>(prevTrip?.endTime.toISOString().slice(0, 10));

	const {
		data,
		error,
		refetch,
	} = useFetch<IPlace[]>(searchArea(search));

	const {
		data: createRes,
		refetch: createRefetch,
	} = useFetch<INewTripResponse>(newTrip({
		area_id: selectedRegion?.placeId ?? '',
		start_time: startDate ?? '',
		end_time: endDate ?? '',
	}));

	const {
		error: updateError,
		refetch: updateRefetch,
	} = useFetch<unknown>(updateTrip({
		id: prevTrip?.id ?? '',
		area_id: selectedRegion?.placeId ?? '',
		start_time: startDate ?? '',
		end_time: endDate ?? '',
	}));

	const {
		error: deleteError,
		refetch: deleteRefetch,
	} = useFetch<unknown>(deleteTrip(prevTrip?.id ?? ''));

	useEffect(() => {
		createRes && navigate(`/trip/${createRes.id}`);
	}, [createRes]);

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

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (endDate && stringDateGreater(e.target.value, endDate)) {
			setStartDate(endDate);
			return;
		}
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (startDate && stringDateGreater(startDate, e.target.value)) {
			setEndDate(startDate);
			return;
		}
		const now = new Date().toISOString().slice(0, 10);
		if (stringDateGreater(now, e.target.value)) {
			setEndDate(now);
			return;
		}
		setEndDate(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedRegion || !startDate || !endDate)
			return;

		if (!prevTrip) {
			await createRefetch();
			return;
		}
		await updateRefetch();
		if (!updateError) {
			navigate(0);
		}
	};

	const handleDelete = async () => {
		await deleteRefetch();
		console.log(deleteError);
		if (!deleteError) {
			navigate('/', { replace: true });
			navigate(0);
		}
	};

	return (
		<form className={cls.form} onSubmit={handleSubmit}>
			<div className={cls.title}>
				{prevTrip ? 'Изменить поездку' : 'Новая поездка'}
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
			{ prevTrip && <button type="button" className="shared-button shared-button-red" onClick={handleDelete}> Удалить </button> }
		</form>
	);
};