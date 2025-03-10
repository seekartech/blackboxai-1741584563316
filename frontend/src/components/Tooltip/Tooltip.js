import React from 'react';
import { Tooltip as MuiTooltip, styled } from '@mui/material';

// Custom styled tooltip
const CustomTooltip = styled(({ className, ...props }) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    fontSize: 12,
    padding: '8px 12px',
    borderRadius: 6,
    maxWidth: 300,
    boxShadow: theme.shadows[2],
  },
  '& .MuiTooltip-arrow': {
    color: theme.palette.grey[800],
  },
}));

function Tooltip({
  children,
  title,
  placement = 'top',
  arrow = true,
  enterDelay = 200,
  leaveDelay = 0,
  ...props
}) {
  // Don't render tooltip if title is empty
  if (!title) {
    return children;
  }

  return (
    <CustomTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      {...props}
    >
      {/* Wrap children in span if it's a string or number */}
      {typeof children === 'string' || typeof children === 'number' ? (
        <span>{children}</span>
      ) : (
        children
      )}
    </CustomTooltip>
  );
}

export default Tooltip;
