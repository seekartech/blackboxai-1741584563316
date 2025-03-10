import React from 'react';
import { Chip } from '@mui/material';

const statusColors = {
  success: {
    color: 'success',
    label: 'Success',
  },
  error: {
    color: 'error',
    label: 'Error',
  },
  warning: {
    color: 'warning',
    label: 'Warning',
  },
  info: {
    color: 'info',
    label: 'Info',
  },
  pending: {
    color: 'warning',
    label: 'Pending',
  },
  completed: {
    color: 'success',
    label: 'Completed',
  },
  cancelled: {
    color: 'error',
    label: 'Cancelled',
  },
  active: {
    color: 'success',
    label: 'Active',
  },
  inactive: {
    color: 'error',
    label: 'Inactive',
  },
  draft: {
    color: 'default',
    label: 'Draft',
  },
};

function StatusBadge({
  status,
  customLabel,
  customColor,
  variant = 'filled',
  size = 'small',
  sx = {},
  ...props
}) {
  const statusConfig = statusColors[status?.toLowerCase()] || {
    color: customColor || 'default',
    label: customLabel || status,
  };

  return (
    <Chip
      label={statusConfig.label}
      color={statusConfig.color}
      variant={variant}
      size={size}
      sx={{
        fontWeight: 500,
        textTransform: 'capitalize',
        ...sx,
      }}
      {...props}
    />
  );
}

export default StatusBadge;
