import React from 'react';
import { Paper } from '@mui/material';

function Card({ children, sx = {}, ...props }) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export default Card;
