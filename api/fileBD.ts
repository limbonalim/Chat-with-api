import { promises as fs } from 'fs';
import {IMessage, IPostMessage} from './types';



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

export const getMessages = async (dateTime: string = '') => {
  let listOfMessages = (await fs.readdir('./messages')).slice(-30);

  if (dateTime) {
    const indexOfLast = listOfMessages.findIndex((message) => `${dateTime}.json` === message);
    listOfMessages = listOfMessages.slice(indexOfLast + 1);
  }

  return await Promise.all(listOfMessages.map(async (file) => {
    const content = await fs.readFile(`./messages/${file}`);
    return JSON.parse(content.toString());
  }));
};