import React from 'react';
import { Box, Typography } from '@mui/material';
import { SentimentDissatisfied as EmptyIcon } from '@mui/icons-material';
import Button from '../Button';

function EmptyState({
  title = 'No Data Found',
  description = 'There are no items to display.',
  icon: Icon = EmptyIcon,
  action,
  actionText = 'Add New',
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        minHeight: 300,
        textAlign: 'center',
        ...sx,
      }}
    >
      <Icon
        sx={{
          fontSize: 64,
          color: 'text.secondary',
          mb: 2,
        }}
      />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: action ? 3 : 0 }}
      >
        {description}
      </Typography>
      {action && (
        <Button
          variant="contained"
          color="primary"
          onClick={action}
          startIcon={<Icon />}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
