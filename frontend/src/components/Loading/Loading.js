import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function Loading({ message = 'Loading...', size = 40, color = 'primary' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
      }}
    >
      <CircularProgress size={size} color={color} />
      {message && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default Loading;
