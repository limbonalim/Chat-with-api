import { Router } from 'express';
import {createMessage} from '../fileBD';

const messagesRouter = Router();

messagesRouter.get('/', (req, res) => {

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