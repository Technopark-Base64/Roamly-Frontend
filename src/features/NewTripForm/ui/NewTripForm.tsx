import React, { MouseEvent, useEffect, useState } from 'react';
import { IPlace, searchArea } from 'src/entities/Place';
import { Input } from 'src/shared/components/Input';
import { useFetch } from 'src/shared/hooks/useFetch';
import cls from './style.module.scss';


export const NewTripForm = () => {
	const [search, setSearch] = useState('');
	const [selectedRegion, setSelectedRegion] = useState<IPlace | null>(null);
	const [startDate, setStartDate] = useState<string | null>(null);
	const [endDate, setEndDate] = useState<string | null>(null);

	const {
		data,
		error,
		refetch,
	} = useFetch<IPlace[]>(searchArea(search));

	useEffect(() => {
		search && refetch();
	}, [search]);

	const handleClickRegion = () => {
		data && setSelectedRegion(data[0]);
	};

	const handleCancelSelect = (e: MouseEvent) => {
		e.stopPropagation();
		setSelectedRegion(null);
	};

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEndDate(e.target.value);
	};

	return (
		<form className={cls.form}>
			<div className={cls.title}>
        Новая поездка
			</div>


			<div className={cls.regionContainer}>
				<span className={cls.hintLabel}> Выберите город </span>

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
					<input type="date" onChange={handleStartDateChange}/>
				</div>

				<div className={cls.dateForm}>
					Конец
					<input type="date" onChange={handleEndDateChange} />
				</div>
			</div>

			<button type="submit" className="shared-button"> Создать </button>
		</form>
	);
};