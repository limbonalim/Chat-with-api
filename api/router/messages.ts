import { Router } from 'express';
import { createMessage, getMessages } from '../fileBD';
import { IMessage } from '../types';

const messagesRouter = Router();

messagesRouter.get('/', async (req, res, next) => {
  try {
    const dateTime = req.query.datetime as string;
    if (dateTime) {
      const date =  new Date(dateTime);
      if (isNaN(date.getDate())) {
        return res.status(400).send({error: 'invalid datetime'});
      }

      const answer: IMessage[] = await getMessages(dateTime);
      return res.send(answer);
    } else {
      const answer: IMessage[] = await getMessages();
      return res.send(answer);
    }
  } catch (e) {
    next(e);
  }
});

messagesRouter.post('/', async (req, res, next) => {
  try {
    const message = req.body.message;
    const author = req.body.author;

    if (!message || !author) {
      return res.status(400).send({error: 'Author and message must be present in the request'});
    }
    const answer = await createMessage({message, author});
    res.status(201);
    res.send(answer);
  } catch (e) {
    next(e);
  }
});

export default messagesRouter;