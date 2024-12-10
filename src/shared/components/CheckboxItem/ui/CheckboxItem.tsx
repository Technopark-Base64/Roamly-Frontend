import cls from './style.module.scss';

interface IProps {
  name: string;
  value: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange: (state: boolean) => void,
}

export const CheckboxItem = ({ name, value, onChange }: IProps) => {
	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		onChange(!value);
	};

	return (
		<div className={cls.container} onClickCapture={handleClick}>
			<input className={cls.checkbox} type="checkbox" checked={value} />
			<div className={cls.name}>
				{ name }
			</div>
		</div>
	);
};
