import React from 'react';
import { Button as MuiButton, CircularProgress, styled } from '@mui/material';
import Tooltip from '../Tooltip';

// Styled Button with enhanced styles and animations
const StyledButton = styled(MuiButton)(({ theme, size = 'medium' }) => ({
  borderRadius: 8,
  textTransform: 'none',
  transition: 'all 0.2s',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[2],
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  ...(size === 'small' && {
    padding: '4px 12px',
    fontSize: '0.8125rem',
  }),
  ...(size === 'medium' && {
    padding: '6px 16px',
    fontSize: '0.875rem',
  }),
  ...(size === 'large' && {
    padding: '8px 22px',
    fontSize: '0.9375rem',
  }),
}));

function Button({
  children,
  loading = false,
  disabled = false,
  tooltip,
  tooltipPlacement = 'top',
  startIcon,
  endIcon,
  loadingPosition = 'center',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) {
  const loadingSize = {
    small: 20,
    medium: 24,
    large: 28,
  }[size];

  const button = (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      startIcon={!loading && loadingPosition === 'start' ? startIcon : null}
      endIcon={!loading && loadingPosition === 'end' ? endIcon : null}
      {...props}
    >
      {loading && loadingPosition === 'start' && (
        <CircularProgress
          size={loadingSize}
          color="inherit"
          sx={{ mr: 1, position: 'relative', top: 1 }}
        />
      )}
      {loading && loadingPosition === 'center' ? (
        <CircularProgress size={loadingSize} color="inherit" />
      ) : (
        children
      )}
      {loading && loadingPosition === 'end' && (
        <CircularProgress
          size={loadingSize}
          color="inherit"
          sx={{ ml: 1, position: 'relative', top: 1 }}
        />
      )}
    </StyledButton>
  );

  if (tooltip && !disabled && !loading) {
    return (
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        {button}
      </Tooltip>
    );
  }

  return button;
}

export default Button;
