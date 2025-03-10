import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function FormDialog({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Save',
  cancelText = 'Cancel',
  maxWidth = 'sm',
  loading = false,
  disabled = false,
  hideSubmit = false,
  hideCancel = false,
  fullWidth = true,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
}) {
  const handleClose = (event, reason) => {
    if (loading) return;
    if (disableBackdropClick && reason === 'backdropClick') return;
    if (disableEscapeKeyDown && reason === 'escapeKeyDown') return;
    onClose(event, reason);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="span" sx={{ flex: 1 }}>
              {title}
            </Typography>
            {!loading && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          {children}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          {!hideCancel && (
            <Button
              onClick={onClose}
              color="inherit"
              disabled={loading}
              sx={{ mr: 1 }}
            >
              {cancelText}
            </Button>
          )}
          {!hideSubmit && (
            <Button
              type="submit"
              variant="contained"
              disabled={disabled || loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {submitText}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormDialog;
