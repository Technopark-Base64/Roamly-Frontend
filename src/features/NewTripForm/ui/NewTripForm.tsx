import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPlace, searchArea } from 'src/entities/Place';
import { ITrip } from 'src/entities/Trip';
import { Input } from 'src/shared/components/Input';
import { useFetch } from 'src/shared/hooks/useFetch';
import { stringDateGreater } from 'src/shared/utils';
import { newTrip } from '../api/newTrip';
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
	} = useFetch<{area_id: string}>(newTrip({
		area_id: selectedRegion?.placeId ?? '',
		start_time: startDate ?? '',
		end_time: endDate ?? '',
	}));

	useEffect(() => {
		createRes && navigate(`/trip/${createRes.area_id}#places`);
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
		setEndDate(e.target.value);
	};

	const handleSubmit = () => {
		if (!selectedRegion || !startDate || !endDate)
			return;

		createRefetch();
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
		</form>
	);
};