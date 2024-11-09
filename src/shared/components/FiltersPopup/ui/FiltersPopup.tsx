import { useEffect, useState } from 'react';
import cls from './style.module.scss';

interface IProps {
	title?: string,
  filters: {
    label: string,
    name: string,
  }[],
  // eslint-disable-next-line no-unused-vars
  onFiltersChange?: (selectedFilters: string[]) => void,
}

export const FiltersPopup = ({ title = 'Фильтры', filters, onFiltersChange }: IProps) => {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	useEffect(() => {
		onFiltersChange?.(selectedFilters);
	}, [selectedFilters]);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;

		if (event.target.checked) {
			setSelectedFilters([...selectedFilters, name]);
		} else {
			setSelectedFilters(selectedFilters.filter((filter) => filter !== name));
		}
	};

	return (
		<div className={cls.card}>
			<div className={cls.title}> {title} </div>

			<div className={cls.buttonContainer}>
				<span> Выбрать все </span>&nbsp;&nbsp; | &nbsp;&nbsp;<span> Сбросить </span>
			</div>

			{filters.map((filter, index) => (
				<div key={index} className={cls.checkboxContainer}>
					<input
						type="checkbox"
						className={cls.checkbox}
						id={`filter-${filter.name}`}
						name={filter.name}
						checked={selectedFilters.includes(filter.name)}
						onChange={handleCheckboxChange}
					/>
					<label htmlFor={`filter-${filter.name}`}> {filter.label} </label>
				</div>
			))}

		</div>
	);
};
