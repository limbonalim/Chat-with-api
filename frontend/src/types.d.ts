export interface IMessage {
  id: string;
  dateTime: string;
  author: string;
  message: string;
}

export type IFormMessage = Pick<IMessage, 'author' | 'message'>