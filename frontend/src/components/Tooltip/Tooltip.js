import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';

function Tooltip({
  children,
  title,
  placement = 'top',
  arrow = true,
  enterDelay = 200,
  leaveDelay = 0,
  ...props
}) {
  return (
    <MuiTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
}

export default Tooltip;
