import React, {ChangeEvent, FormEvent, useState} from 'react';
import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import type {IFormMessage} from '@/types';

interface Props {
  handleSubmit: (formMessage: IFormMessage) => void;
}

const MessageForm: React.FC<Props> = ({handleSubmit}) => {
  const [message, setMessage] = useState<IFormMessage>({
    message: '',
    author: ''
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMessage(prev => (
      {
        ...prev,
        [name]: value
      }
    ));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(message);
  };

  return (
    <form
      onSubmit={onSubmit}
    >
      <Grid
        container
        spacing={2}
        direction='column'
      >
        <Grid item>
          <TextField
            onChange={onChange}
            value={message.author}
            label='Author'
            name='author'
            id='author'
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={onChange}
            value={message.message}
            label='Message'
            name='message'
            id='message'
            multiline
            rows={4}
          />
        </Grid>
        <Grid item>
          <Button
            type='submit'
            variant='contained'
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;