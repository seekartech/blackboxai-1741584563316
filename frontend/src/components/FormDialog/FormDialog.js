import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Button from '../Button';

function FormDialog({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  loading = false,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
  disableBackdropClick = false,
  ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

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
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {title}
            {showCloseButton && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
                size="small"
                disabled={loading}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          {children}
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
          >
            {submitText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormDialog;
