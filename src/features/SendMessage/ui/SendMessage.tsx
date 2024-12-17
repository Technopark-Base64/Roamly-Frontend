import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useState } from 'react';
import { Input } from 'src/shared/components/Input';
import { useFetch } from 'src/shared/hooks/useFetch';
import { sendMessages } from '../api/sendMessages';
import cls from './style.module.scss';

interface IProps {
	tripId: string,
	onSend: (mes: string) => void;
}

export const SendMessage = ({ onSend, tripId }: IProps) => {
	const [message, setMessage] = useState('');

	const { refetch } = useFetch(sendMessages(tripId, { message }));

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		message && refetch();
		onSend(message);
		setMessage('');
	};

	return (
		<form className={cls.bar} onSubmit={handleSubmit}>
			<Input value={message} onChange={setMessage} placeholder="Начните писать" />
			<button className="shared-icon-button">
				<SendOutlinedIcon/>
			</button>
		</form>
	);
};