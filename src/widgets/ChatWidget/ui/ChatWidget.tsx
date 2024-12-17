import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SendMessage } from 'src/features/SendMessage';
import { IMessage, MessageCard } from 'src/entities/Message';
import { useFetch } from 'src/shared/hooks/useFetch';
import { IWebSocketMessage, WebSocket, WSActions } from 'src/shared/services/websocket';
import { getMessages } from '../api/getMessages';
import cls from './style.module.scss';

const HELLO_MESSAGE = `Привет! Я ваш персональный помощник по планированию путешествий. 
Готов помочь вам подобрать идеальные места для посещения, составить удобный маршрут, 
учитывая ваши предпочтения и временные рамки. Расскажите мне, что вас интересует, и я 
смогу помочь вам организовать незабываемое приключение!`;

interface IProps {
	onClose: () => void;
	className?: string;
}

export const ChatWidget = ({ onClose, className }: IProps) => {
	const chatRef = useRef<HTMLDivElement | null>(null);
	const ListRef = useRef<HTMLDivElement | null>(null);
	const [pendingMessage, setPendingMessage] = useState('');
	const { id } = useParams();

	const { data: messages, refetch } = useFetch<IMessage[]>(getMessages(id ?? ''));

	const handleWebsocket = (message: IWebSocketMessage) => {
		const actions = [WSActions.ChatReply];
		if (message.trip_id === id && actions.includes(message.action)) {
			refetch();
			setPendingMessage('');
		}
	};

	useEffect(() => {
		WebSocket.subscribe(handleWebsocket);
		return () => WebSocket.unsubscribe(handleWebsocket);
	}, [handleWebsocket]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!chatRef.current?.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		ListRef.current?.scroll(0, 999999);
	}, [messages, pendingMessage]);

	return (
		<div className={`${cls.window} ${className}`} ref={chatRef}>
			<div className={cls.header}>
				<div className={cls.nameContainer}>
					<div className={cls.avatar} />
					<div>
						Умный помощник Ромлик
					</div>
				</div>
				<button className="shared-icon-button" onClick={onClose}>
					<CloseOutlinedIcon/>
				</button>
			</div>

			<div className={cls.messagesList} ref={ListRef}>
				<MessageCard message={{ role: 'assistant', content: HELLO_MESSAGE, createdAt: '' }}/>
				{messages && messages.map((mes, index) =>
					<MessageCard message={mes} key={index} />
				)}
				{pendingMessage &&
					<MessageCard message={{ role: 'user', content: pendingMessage, createdAt: new Date().toISOString() }}/>
				}
			</div>

			<SendMessage onSend={setPendingMessage} tripId={id ?? ''} />
		</div>
	);
};