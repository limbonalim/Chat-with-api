'use client'
import React from 'react';
import {Button, Container, Grid, styled, Typography} from '@mui/material';
import MessageForm from '@/components/MessageForm/MessageForm';
import type {IFormMessage} from '@/types';
import {useMutation} from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import {useRouter} from 'next/navigation';
import NextLink from 'next/link';

const Link = styled(NextLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&hover': {
    color: 'inherit'
  }
})

const NewMessage = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (message: IFormMessage) => await axiosApi.post('/messages', message),
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: Error) => {
      console.log(error);
      router.push('/');
    },
  })

  const handleSubmit = (formMessage: IFormMessage) => {
    mutation.mutate(formMessage);
  };

  return (
    <Container>
      <Grid container alignContent='center' >
        <Button
          color="primary"
          component={Link}
          href='/'
        >Back</Button>
        <Grid item >
          <Typography
            variant='h2'
            mb={2}
          >New message</Typography>
        </Grid>
      </Grid>

      <MessageForm handleSubmit={handleSubmit}/>
    </Container>
  );
};

export default NewMessage;