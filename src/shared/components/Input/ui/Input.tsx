import React, { useEffect, useRef, useState } from 'react';
import cls from './style.module.scss';

interface IProps {
	initValue: string,
  placeholder?: string,
  delay?: number,
  onChange?: ((input: string) => void) | (() => void),
}

export const Input = ({ placeholder = '', initValue = '', delay = 0, onChange }: IProps) => {
	const timerRef = useRef<NodeJS.Timeout>();
	const [value, setValue] = useState(initValue);

	useEffect(() => {
		timerRef.current = setTimeout(() => onChange?.(value), delay);

		return () => clearTimeout(timerRef.current);
	}, [value]);

	const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
				onChange={handleLoginInput}
			/>
			<div className={cls.clearBtn} onClick={handleClear}>
				x
			</div>
		</div>
	);
};
