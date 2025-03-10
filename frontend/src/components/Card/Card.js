import React from 'react';
import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Divider,
  Collapse,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

function Card({
  title,
  subtitle,
  headerAction,
  actions,
  children,
  collapsible = false,
  defaultExpanded = true,
  elevation = 0,
  sx = {},
  headerProps = {},
  contentProps = {},
  actionsProps = {},
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <MuiCard
      elevation={elevation}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
    >
      {/* Card Header */}
      {(title || subtitle || headerAction) && (
        <>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                  {title}
                </Typography>
                {collapsible && (
                  <IconButton
                    onClick={handleExpandClick}
                    sx={{
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      ml: 1,
                    }}
                    size="small"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                )}
              </Box>
            }
            subheader={subtitle}
            action={
              headerAction || (
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              )
            }
            {...headerProps}
          />
          <Divider />
        </>
      )}

      {/* Card Content */}
      {collapsible ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent {...contentProps}>{children}</CardContent>
        </Collapse>
      ) : (
        <CardContent {...contentProps}>{children}</CardContent>
      )}

      {/* Card Actions */}
      {actions && (
        <>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <CardActions {...actionsProps}>{actions}</CardActions>
        </>
      )}
    </MuiCard>
  );
}

export default Card;
