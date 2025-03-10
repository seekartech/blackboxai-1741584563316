import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Button from '../Button';

function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
  disableBackdropClick = false,
  ...props
}) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !disableBackdropClick) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      onClick={handleBackdropClick}
      {...props}
    >
      {title && (
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            {showCloseButton && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
      )}
      
      <DialogContent dividers>{children}</DialogContent>

      {actions && (
        <DialogActions
          sx={{
            padding: 2,
            gap: 1,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

// Predefined action buttons
Modal.CancelButton = ({ onClick, ...props }) => (
  <Button
    variant="outlined"
    color="inherit"
    onClick={onClick}
    {...props}
  >
    Cancel
  </Button>
);

Modal.ConfirmButton = ({ onClick, ...props }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    {...props}
  >
    Confirm
  </Button>
);

export default Modal;
