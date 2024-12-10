import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';

interface IProps {
	initValue: string,
  placeholder?: string,
  delay?: number,
	readonly?: boolean,
	// eslint-disable-next-line no-unused-vars
  onChange?: ((input: string) => void) | (() => void),
	onFocus?: () => void,
	onBlur?: () => void,
}

export const Input = ({ placeholder = '', initValue = '', readonly, delay = 0, onChange, onBlur, onFocus }: IProps) => {
	const timerRef = useRef<NodeJS.Timeout>();
	const [value, setValue] = useState(initValue);

	useEffect(() => {
		timerRef.current = setTimeout(() => onChange?.(value), delay);

		return () => clearTimeout(timerRef.current);
	}, [value]);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleClear = () => {
		setValue('');
	};

	return (
		<div className={cls.wrapper}>
			<input
				className="shared-input"
				type="text"
				value={value}
				placeholder={placeholder}
				disabled={readonly}
				onChange={handleInput}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			{!readonly &&
				<div className={cls.clearBtn} onClick={handleClear}>
					<CloseOutlinedIcon/>
				</div>
			}
		</div>
	);
};
