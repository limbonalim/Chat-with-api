import React from 'react';
import { Grid, Typography } from '@mui/material';
import FormatDate from '@/components/UI/FormatDate/FormatDate';

interface Props {
  dataTime: string;
  author: string;
  message: string;
}

const MemoMessage: React.FC<Props> = React.memo(function Message({dataTime, author, message}) {
  const date = new FormatDate(dataTime);
  // console.log(date.getFormatDate())
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
        <Typography>{date.getFormatDate()}</Typography>
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
});

export default MemoMessage;