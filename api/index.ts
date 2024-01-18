import express, { json } from 'express';
import cors from 'cors';
import messagesRouter from './router/messages';

const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.use('/messages', messagesRouter);

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});