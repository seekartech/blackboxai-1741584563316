import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  InboxOutlined as InboxIcon,
  SearchOff as SearchOffIcon,
  ErrorOutline as ErrorIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const illustrations = {
  inbox: <InboxIcon sx={{ fontSize: 64, color: 'action.active', mb: 2 }} />,
  search: <SearchOffIcon sx={{ fontSize: 64, color: 'action.active', mb: 2 }} />,
  error: <ErrorIcon sx={{ fontSize: 64, color: 'action.active', mb: 2 }} />,
};

function EmptyState({
  type = 'inbox',
  title = 'No Data',
  description = 'No data available at the moment.',
  action,
  actionLabel = 'Add New',
  actionIcon = <AddIcon />,
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 2,
        ...sx,
      }}
    >
      {illustrations[type]}
      
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: 'text.primary', fontWeight: 500 }}
      >
        {title}
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 400, mb: action ? 3 : 0 }}
      >
        {description}
      </Typography>

      {action && (
        <Button
          variant="contained"
          startIcon={actionIcon}
          onClick={action}
          sx={{ mt: 2 }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
