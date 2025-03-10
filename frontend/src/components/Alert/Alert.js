import React from 'react';
import { Alert as MuiAlert, AlertTitle } from '@mui/material';

function Alert({ 
  severity = 'info', 
  title,
  children,
  sx = {},
  ...props 
}) {
  return (
    <MuiAlert
      severity={severity}
      variant="outlined"
      sx={{
        '& .MuiAlert-message': {
          width: '100%',
        },
        ...sx,
      }}
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  );
}

export default Alert;
