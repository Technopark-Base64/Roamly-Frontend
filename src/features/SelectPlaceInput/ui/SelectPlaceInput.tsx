import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useEffect, useMemo, useState } from 'react';
import { IPlace } from 'src/entities/Place';
import { Input } from 'src/shared/components/Input';
import cls from './style.module.scss';

interface IProps {
  places: IPlace[],
  prevPlace?: IPlace,
  isEditable?: boolean,
  // eslint-disable-next-line no-unused-vars
  onSelectedPlaceChange?: (place: IPlace | null) => void,
}

export const SelectPlaceInput = ({ places, prevPlace, isEditable = true, onSelectedPlaceChange }: IProps) => {
	const [search, setSearch] = useState(prevPlace?.name ?? '');
	const [showList, setShowList] = useState(false);
	const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(prevPlace ?? null);

	useEffect(() => {
		onSelectedPlaceChange?.(selectedPlace);
	}, [selectedPlace]);

	const searchResults = useMemo(() => {
		const res = places.filter((pl) => pl.name.toLowerCase().includes(search.trim().toLowerCase())).slice(0, 5);
		return res;
	}, [search, places]);

	const handleCanselSelect = (event: React.MouseEvent) => {
		event.stopPropagation();
		setSelectedPlace(null);
	};

	return (
		<div className={cls.regionContainer}>
			<span className={cls.hintLabel}> Выберите место </span>

			{!selectedPlace &&
        <Input
        	initValue={search}
        	placeholder={!isEditable ? 'Место не выбрано' : 'Выберите место'}
        	delay={300}
        	readonly={!isEditable}
        	onChange={setSearch}
        	onFocus={() => setShowList(true)}
        	onBlur={() => setShowList(false)}
        />
			}

			{selectedPlace &&
        <div
        	className={cls.regionShow}
        >
        	{ selectedPlace.name }
        	{isEditable &&
            <div className={`${cls.cancelBtn} ${cls.pointer}`} onClick={handleCanselSelect}>
            	<CloseOutlinedIcon/>
            </div>
        	}
        </div>
			}

			{showList &&
        <div className={cls.listContainer}>
        	{!selectedPlace && !searchResults.length && search &&
              <div className={cls.regionShow}>
              	<span className={cls.errLabel}>
              Места не найдено
              	</span>
              </div>
        	}

        	{!selectedPlace &&
            searchResults.map((pl) => (
            	<div className={`${cls.regionShow} ${cls.pointer}`} onMouseDown={() => setSelectedPlace(pl)}>
            		{pl.name}
            	</div>
            ))
        	}
        </div>
			}

		</div>
	);
};