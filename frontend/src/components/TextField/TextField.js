import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

function TextField({ error, helperText, sx = {}, ...props }) {
  return (
    <MuiTextField
      variant="outlined"
      fullWidth
      error={!!error}
      helperText={error || helperText}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 1,
          backgroundColor: 'background.paper',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
}

export default TextField;
