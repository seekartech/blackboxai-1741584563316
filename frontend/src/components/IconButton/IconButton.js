import React from 'react';
import { IconButton as MuiIconButton, CircularProgress } from '@mui/material';
import Tooltip from '../Tooltip';

function IconButton({
  icon: Icon,
  loading = false,
  tooltip,
  color = 'default',
  size = 'medium',
  disabled = false,
  sx = {},
  ...props
}) {
  const button = (
    <MuiIconButton
      color={color}
      size={size}
      disabled={disabled || loading}
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...props}
    >
      {loading ? (
        <CircularProgress
          size={24}
          color="inherit"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      ) : (
        Icon && <Icon />
      )}
    </MuiIconButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {button}
      </Tooltip>
    );
  }

  return button;
}

export default IconButton;
