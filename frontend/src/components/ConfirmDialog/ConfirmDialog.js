import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Help as HelpIcon,
  CheckCircle as SuccessIcon,
} from '@mui/icons-material';

const icons = {
  warning: <WarningIcon sx={{ color: 'warning.main', fontSize: 40 }} />,
  error: <ErrorIcon sx={{ color: 'error.main', fontSize: 40 }} />,
  info: <HelpIcon sx={{ color: 'info.main', fontSize: 40 }} />,
  success: <SuccessIcon sx={{ color: 'success.main', fontSize: 40 }} />,
};

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  confirmButtonProps = {},
  maxWidth = 'xs',
  loading = false,
  hideCancel = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 1 }}>{icons[type]}</Box>
          <Typography variant="h6" component="span" sx={{ flex: 1 }}>
            {title}
          </Typography>
          {!loading && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>{content}</Typography>
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
        <Button
          variant="contained"
          onClick={onConfirm}
          color={type === 'error' ? 'error' : 'primary'}
          disabled={loading}
          {...confirmButtonProps}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
