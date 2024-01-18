import { promises as fs } from 'fs';
import {IMessage, IPostMessage} from "./types";



export const createMessage = async (data: IPostMessage) => {
  const message: IMessage = {
    id: crypto.randomUUID(),
    dateTime: new Date ().toISOString(),
    ...data
  };
  await fs.mkdir('./messages', {recursive: true});
  await fs.writeFile(`./messages/${message.dateTime}.json`, JSON.stringify(message));
  return message;
};