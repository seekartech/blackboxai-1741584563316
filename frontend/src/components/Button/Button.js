import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';

function Button({ 
  children, 
  loading = false, 
  startIcon, 
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  sx = {},
  ...props 
}) {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      startIcon={!loading && startIcon}
      disabled={loading || props.disabled}
      sx={{
        position: 'relative',
        textTransform: 'none',
        minWidth: 100,
        ...sx,
      }}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            left: '50%',
            marginLeft: '-12px',
          }}
        />
      )}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </span>
    </MuiButton>
  );
}

export default Button;
