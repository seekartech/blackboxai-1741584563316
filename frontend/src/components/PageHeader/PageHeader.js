import React from 'react';
import { Box, Typography, Button, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  action,
  actionIcon,
  actionLabel,
  onActionClick,
}) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <Link
            component={RouterLink}
            to="/dashboard"
            color="inherit"
            sx={{ 
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Dashboard
          </Link>
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography key={index} color="text.primary">
                {breadcrumb.label}
              </Typography>
            ) : (
              <Link
                key={index}
                component={RouterLink}
                to={breadcrumb.href}
                color="inherit"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {breadcrumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Action Button */}
        {action && (
          <Button
            variant="contained"
            startIcon={actionIcon}
            onClick={onActionClick}
          >
            {actionLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default PageHeader;
