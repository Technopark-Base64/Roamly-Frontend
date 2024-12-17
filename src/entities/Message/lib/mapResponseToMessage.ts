import { mapResponseToPlace } from '../../Place';
import { IMessage, IMessageResponse, TMessageContentResponse } from '../model/types';

export const mapResponseToMessage = (res: IMessageResponse): IMessage => {
	let content: IMessage['content'] = res.content;

	if (res.role === 'assistant') {
		const contentRes: TMessageContentResponse = JSON.parse(content);
		content = {
			message: contentRes.message,
			places: contentRes.places.map(mapResponseToPlace),
		};
	}

	return {
		role: res.role,
		content,
		createdAt: res.created_at,
	};
};
