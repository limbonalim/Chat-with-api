'use client';
import Message from '@/components/Message/Message';
import { CircularProgress, Container, Grid } from '@mui/material';
import { JSX } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import type { IMessage } from '@/types';


export default function Home() {
  const {data: messages, isLoading} = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await axiosApi.get<IMessage[]>('/messages');
      return response.data;
    }
  });

  let listOfMessages: JSX.Element | JSX.Element[] = (
    <Grid item sx={{
      alignSelf: 'center'
    }}>
      <CircularProgress/>
    </Grid>
  );

  if (!isLoading && messages) {
    listOfMessages = messages.map((item) => (
      <Grid
        key={item.id}
        item
      >
        <Message
          dataTime={item.dateTime}
          author={item.author}
          message={item.message}
        />
      </Grid>

    ));
  }

  return (
    <main>
      <Container>
        <Grid
          container
          spacing={1}
          direction="column-reverse"
        >
          {listOfMessages}
        </Grid>
      </Container>
    </main>
  );
}
