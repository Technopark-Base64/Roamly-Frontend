import { IMessage } from '../model/types';
import { PlaceMessageCard } from './PlaceMessageCard';
import cls from './style.module.scss';

interface IProps {
	message: IMessage,
}

export const MessageCard = ({ message }: IProps) => {
	if (message.role !== 'user' && message.role !== 'assistant')
		return null;

	return (
		<>
			<div className={`${cls.message} ${message.role === 'user' ? cls.myMessage : cls.otherMessage}`}>
				<div className={cls.text}>
					{typeof message.content === 'string' ? message.content : message.content.message}
				</div>
				<span className={cls.time}>
					{message.createdAt && (new Date(message.createdAt)).toTimeString().slice(0,5)}
				</span>
			</div>
			{typeof message.content === 'object' &&
				<div className={cls.placesShowcase}>
					{message.content.places.map((pl, index) =>
						<PlaceMessageCard place={pl} key={index} />
					)}
				</div>
			}
		</>
	);
};
