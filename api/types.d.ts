export interface IPostMessage {
  author: string;
  message: string;
}

export interface IMessage extends IPostMessage{
  id: string;
  dateTime: string;
}