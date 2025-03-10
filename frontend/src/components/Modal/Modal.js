import React from 'react';
import {
  Modal as MuiModal,
  Box,
  IconButton,
  Typography,
  Paper,
  Fade,
  Backdrop,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  hideCloseButton = false,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  sx = {},
}) {
  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
      return;
    }
    onClose?.(event, reason);
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableEscapeKeyDown={disableEscapeKeyDown}
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: fullWidth
              ? {
                  xs: '90%',
                  sm: maxWidth === 'xs' ? '444px' : '600px',
                  md: maxWidth === 'md' ? '900px' : maxWidth === 'lg' ? '1200px' : '600px',
                }
              : 'auto',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            ...sx,
          }}
        >
          {/* Modal Header */}
          {title && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" component="h2">
                {title}
              </Typography>
              {!hideCloseButton && (
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                  }}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          )}

          {/* Modal Content */}
          <Paper
            sx={{
              maxHeight: title ? 'calc(90vh - 64px)' : '90vh',
              overflow: 'auto',
              borderRadius: 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Box sx={{ p: 3 }}>{children}</Box>
          </Paper>
        </Box>
      </Fade>
    </MuiModal>
  );
}

export default Modal;
