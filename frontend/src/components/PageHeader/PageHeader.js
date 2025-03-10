import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PageHeader({ 
  title, 
  subtitle,
  breadcrumbs = [],
  actions,
  sx = {},
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mb: 3,
        ...sx,
      }}
    >
      {breadcrumbs.length > 0 && (
        <Breadcrumbs sx={{ mb: 2 }}>
          {breadcrumbs.map((crumb, index) => (
            <Link
              key={index}
              color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
              sx={{ 
                cursor: crumb.path ? 'pointer' : 'default',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: crumb.path ? 'underline' : 'none',
                },
              }}
              onClick={() => crumb.path && navigate(crumb.path)}
            >
              {crumb.label}
            </Link>
          ))}
        </Breadcrumbs>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PageHeader;
