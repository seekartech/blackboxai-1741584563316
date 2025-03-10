import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            maxWidth: 480,
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" paragraph>
            404
          </Typography>
          <Typography variant="h3" paragraph>
            Page Not Found!
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
            Be sure to check your spelling.
          </Typography>

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
            startIcon={<HomeIcon />}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFound;
