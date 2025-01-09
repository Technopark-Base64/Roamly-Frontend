import { IPlace, IPlaceResponse } from '../../Place';

export interface IMessage {
  role: 'system' | 'user' | 'assistant',
  content: string | TContent,
  createdAt: string,
}

type TContent = {
  message: string,
  places?: IPlace[],
}

export interface IMessageResponse {
  role: 'system' | 'user' | 'assistant',
  content: string,
  created_at: string,
}

export type TMessageContentResponse = {
  message: string,
  places: IPlaceResponse[] | null,
}