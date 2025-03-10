import React from 'react';
import {
  Snackbar as MuiSnackbar,
  Alert,
  IconButton,
  styled,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Styled Alert for Snackbar
const StyledAlert = styled(Alert)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  '.MuiAlert-message': {
    padding: '8px 0',
  },
}));

function Snackbar({
  open,
  message,
  severity = 'success',
  autoHideDuration = 6000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  onClose,
  action,
  variant = 'filled',
  elevation = 6,
  sx = {},
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose?.(event, reason);
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      sx={sx}
    >
      <StyledAlert
        elevation={elevation}
        variant={variant}
        onClose={handleClose}
        severity={severity}
        action={
          action || (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )
        }
      >
        {message}
      </StyledAlert>
    </MuiSnackbar>
  );
}

// Snackbar variants for common use cases
Snackbar.Success = (props) => <Snackbar severity="success" {...props} />;
Snackbar.Error = (props) => <Snackbar severity="error" {...props} />;
Snackbar.Warning = (props) => <Snackbar severity="warning" {...props} />;
Snackbar.Info = (props) => <Snackbar severity="info" {...props} />;

export default Snackbar;
