import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useState } from 'react';
import { Input } from 'src/shared/components/Input';
import { useFetch } from 'src/shared/hooks/useFetch';
import { sendMessages } from '../api/sendMessages';
import cls from './style.module.scss';

interface IProps {
	tripId: string,
	// eslint-disable-next-line no-unused-vars
	onSend: (mes: string) => void;
	disabled?: boolean;
}

export const SendMessage = ({ onSend, tripId, disabled }: IProps) => {
	const [message, setMessage] = useState('');

	const { refetch } = useFetch(sendMessages(tripId, { message }));

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (disabled)
			return;

		message && refetch();
		onSend(message);
		setMessage('');
	};

	return (
		<form className={cls.bar} onSubmit={handleSubmit}>
			<Input value={message} onChange={setMessage} placeholder="Начните писать" />
			<button disabled={disabled} className={`shared-icon-button ${disabled ? cls.disabledBtn : ''}`}>
				<SendOutlinedIcon/>
			</button>
		</form>
	);
};