import React from 'react';
import cls from './style.module.scss';

interface IProps {
	value: boolean,
	// eslint-disable-next-line no-unused-vars
  onChange: (state: boolean) => void,
}

export const Switch = ({ value = false, onChange }: IProps) => {
	const handleChangeSwitch = () => {
		onChange(!value);
	};

	return (
		<label className={cls.switch}>
			<input
				type="checkbox"
				checked={value}
				onChange={handleChangeSwitch}
			/>
			<span className={cls.slider}></span>
		</label>
	);
};
