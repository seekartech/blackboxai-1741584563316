import React from 'react';
import { Box, Typography } from '@mui/material';

const statusConfigs = {
  // Transaction statuses
  pending: {
    color: '#ff9800',
    backgroundColor: '#fff3e0',
    label: 'Pending',
  },
  completed: {
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    label: 'Completed',
  },
  cancelled: {
    color: '#f44336',
    backgroundColor: '#ffebee',
    label: 'Cancelled',
  },
  // Purchase statuses
  draft: {
    color: '#607d8b',
    backgroundColor: '#eceff1',
    label: 'Draft',
  },
  ordered: {
    color: '#2196f3',
    backgroundColor: '#e3f2fd',
    label: 'Ordered',
  },
  received: {
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    label: 'Received',
  },
  partial: {
    color: '#ff9800',
    backgroundColor: '#fff3e0',
    label: 'Partially Received',
  },
  // Payment statuses
  paid: {
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    label: 'Paid',
  },
  unpaid: {
    color: '#f44336',
    backgroundColor: '#ffebee',
    label: 'Unpaid',
  },
  partial_payment: {
    color: '#ff9800',
    backgroundColor: '#fff3e0',
    label: 'Partial Payment',
  },
  // Stock statuses
  in_stock: {
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    label: 'In Stock',
  },
  low_stock: {
    color: '#ff9800',
    backgroundColor: '#fff3e0',
    label: 'Low Stock',
  },
  out_of_stock: {
    color: '#f44336',
    backgroundColor: '#ffebee',
    label: 'Out of Stock',
  },
  // User statuses
  active: {
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    label: 'Active',
  },
  inactive: {
    color: '#f44336',
    backgroundColor: '#ffebee',
    label: 'Inactive',
  },
};

function StatusBadge({ 
  status, 
  customLabel,
  size = 'medium',
  variant = 'contained',
}) {
  const config = statusConfigs[status] || {
    color: '#9e9e9e',
    backgroundColor: '#f5f5f5',
    label: status,
  };

  const sizeStyles = {
    small: {
      px: 1,
      py: 0.25,
      fontSize: '0.75rem',
    },
    medium: {
      px: 1.5,
      py: 0.5,
      fontSize: '0.875rem',
    },
    large: {
      px: 2,
      py: 0.75,
      fontSize: '1rem',
    },
  };

  const variantStyles = {
    contained: {
      backgroundColor: config.backgroundColor,
      color: config.color,
    },
    outlined: {
      backgroundColor: 'transparent',
      color: config.color,
      border: `1px solid ${config.color}`,
    },
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '16px',
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          textTransform: 'capitalize',
          lineHeight: 1,
        }}
      >
        {customLabel || config.label}
      </Typography>
    </Box>
  );
}

export default StatusBadge;
