import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';

interface IProps {
	initValue?: string,
	value?: string,
  placeholder?: string,
  delay?: number,
	readonly?: boolean,
	// eslint-disable-next-line no-unused-vars
  onChange?: ((input: string) => void) | (() => void),
	onFocus?: () => void,
	onBlur?: () => void,
}

export const Input = ({ placeholder = '', initValue = '', value, readonly, delay = 0, onChange, onBlur, onFocus }: IProps) => {
	const timerRef = useRef<NodeJS.Timeout>();
	const [internalValue, setInternalValue] = useState(initValue);

	useEffect(() => {
		if (value !== undefined)
			setInternalValue(value);
	}, [value]);

	useEffect(() => {
		timerRef.current = setTimeout(() => onChange?.(internalValue), delay);

		return () => clearTimeout(timerRef.current);
	}, [internalValue]);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInternalValue(event.target.value);
	};

	const handleClear = () => {
		setInternalValue('');
	};

	return (
		<div className={cls.wrapper}>
			<input
				className="shared-input"
				type="text"
				value={internalValue}
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
