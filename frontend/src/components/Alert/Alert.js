import React from 'react';
import {
  Alert as MuiAlert,
  AlertTitle,
  IconButton,
  Collapse,
  styled,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Styled Alert with enhanced styles
const StyledAlert = styled(MuiAlert)(({ theme, severity }) => ({
  borderRadius: theme.shape.borderRadius,
  '& .MuiAlert-icon': {
    fontSize: 24,
  },
  ...(severity === 'success' && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
  ...(severity === 'error' && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
  ...(severity === 'warning' && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  }),
  ...(severity === 'info' && {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.dark,
  }),
}));

function Alert({
  severity = 'info',
  variant = 'standard',
  title,
  children,
  action,
  onClose,
  icon,
  sx = {},
  elevation = 0,
  closeText = 'Close',
  showCloseButton = true,
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event) => {
    setOpen(false);
    if (onClose) {
      onClose(event);
    }
  };

  return (
    <Collapse in={open}>
      <StyledAlert
        severity={severity}
        variant={variant}
        elevation={elevation}
        icon={icon}
        action={
          action || (showCloseButton && onClose) ? (
            <>
              {action}
              {showCloseButton && onClose && (
                <IconButton
                  aria-label={closeText}
                  color="inherit"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            </>
          ) : null
        }
        sx={{
          '& .MuiAlert-message': {
            width: '100%',
          },
          ...sx,
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </StyledAlert>
    </Collapse>
  );
}

// Alert variants for common use cases
Alert.Success = (props) => <Alert severity="success" {...props} />;
Alert.Error = (props) => <Alert severity="error" {...props} />;
Alert.Warning = (props) => <Alert severity="warning" {...props} />;
Alert.Info = (props) => <Alert severity="info" {...props} />;

export default Alert;
