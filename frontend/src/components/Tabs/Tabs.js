import React from 'react';
import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  Box,
  styled,
} from '@mui/material';

// Styled Tab component
const StyledTab = styled(MuiTab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  padding: '12px 16px',
  marginRight: theme.spacing(4),
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
    opacity: 1,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.selected,
  },
}));

// Styled Tabs component
const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: theme.palette.primary.main,
  },
}));

function TabPanel({ children, value, index, ...props }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...props}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

function Tabs({
  value,
  onChange,
  tabs = [],
  orientation = 'horizontal',
  variant = 'standard',
  centered = false,
  scrollButtons = 'auto',
  indicatorColor = 'primary',
  textColor = 'primary',
  children,
  sx = {},
}) {
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs
          value={value}
          onChange={onChange}
          orientation={orientation}
          variant={variant}
          centered={centered}
          scrollButtons={scrollButtons}
          indicatorColor={indicatorColor}
          textColor={textColor}
          aria-label="tabs"
        >
          {tabs.map((tab, index) => (
            <StyledTab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition={tab.iconPosition}
              disabled={tab.disabled}
              {...a11yProps(index)}
            />
          ))}
        </StyledTabs>
      </Box>
      {React.Children.map(children, (child, index) => (
        <TabPanel value={value} index={index}>
          {child}
        </TabPanel>
      ))}
    </Box>
  );
}

export { TabPanel };
export default Tabs;
