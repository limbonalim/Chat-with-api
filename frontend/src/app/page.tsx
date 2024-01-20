'use client';
import MemoMessage from '@/components/Message/Message';
import { Button, CircularProgress, Container, Grid, styled } from '@mui/material';
import { JSX, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import type { IMessage } from '@/types';
import NextLink from 'next/link';


const Link = styled(NextLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&hover': {
    color: 'inherit'
  }
});

export default function Home() {
  const getData = async ({pageParam}: { pageParam: string }) => {
    const response = await axiosApi.get<IMessage[]>('/messages' + pageParam);
    return response.data;
  };

  const {data, fetchNextPage, isLoading} = useInfiniteQuery({
    queryKey: ['prod'],
    initialPageParam: '',
    queryFn: getData,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length > 0 ? `?datetime=${lastPage[lastPage.length - 1].dateTime}` : lastPageParam;
    },
  });

  useEffect(() => {
    setInterval(() => fetchNextPage(), 5000);
  });

  let messages;
  if (data) {
    messages = data.pages.flat();
  }

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
        <MemoMessage
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
        <Button
          color="primary"
          component={Link}
          href="/new-message"
          sx={{
            mb: 2
          }}
        >New Message</Button>
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
