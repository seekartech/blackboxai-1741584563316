import React from 'react';
import { IconButton as MuiIconButton, styled } from '@mui/material';
import Tooltip from '../Tooltip';

// Styled IconButton with hover effects
const StyledIconButton = styled(MuiIconButton)(({ theme, color = 'default' }) => ({
  padding: 8,
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.1)',
  },
  ...(color === 'error' && {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  }),
  ...(color === 'success' && {
    color: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
  }),
  ...(color === 'warning' && {
    color: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
    },
  }),
  ...(color === 'info' && {
    color: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.light,
    },
  }),
}));

function IconButton({
  children,
  tooltip,
  tooltipPlacement = 'top',
  disabled = false,
  size = 'medium',
  color = 'default',
  onClick,
  ...props
}) {
  const button = (
    <StyledIconButton
      size={size}
      color={color}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledIconButton>
  );

  if (tooltip && !disabled) {
    return (
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        {button}
      </Tooltip>
    );
  }

  return button;
}

export default IconButton;
