import React from 'react';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  dataTime: string;
  author: string;
  message: string;
}

const Message: React.FC<Props> = ({dataTime, author, message}) => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        border: '2px solid #3375dd',
        borderRadius: 5,
        padding: '10px 0',
        margin: 0
      }}
    >
      <Grid
        item
        container
        sx={{
          borderBottom: '2px solid #3375dd',
          justifyContent: 'space-between',
          padding: '0 10px'
        }}
      >
        <Typography
          align={'right'}
        >{author}:
        </Typography>
        <Typography>{dayjs(dataTime).format('DD.MM.YY в HH.mm')}</Typography>
      </Grid>
      <Grid
        sx={{
          padding: '0 10px'
        }}
        item
      >
        {message}
      </Grid>
    </Grid>
  );
};

export default Message;