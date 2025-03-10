import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

function TextField({
  error,
  helperText,
  required,
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  margin = 'normal',
  ...props
}) {
  // Add custom styling and behavior
  const customProps = {
    error: !!error,
    helperText: error || helperText,
    required,
    fullWidth,
    size,
    variant,
    margin,
    sx: {
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: error ? 'error.main' : 'primary.main',
        },
      },
      '& .MuiFormHelperText-root': {
        marginLeft: 0,
        marginRight: 0,
      },
      ...props.sx,
    },
    InputLabelProps: {
      shrink: true,
      ...props.InputLabelProps,
    },
  };

  return <MuiTextField {...customProps} {...props} />;
}

export default TextField;
