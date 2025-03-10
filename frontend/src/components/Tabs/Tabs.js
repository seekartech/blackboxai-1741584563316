import React from 'react';
import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  Box,
} from '@mui/material';

function TabPanel({ children, value, index, ...props }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...props}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Tabs({
  value,
  onChange,
  tabs = [],
  variant = 'standard',
  orientation = 'horizontal',
  centered = false,
  scrollButtons = 'auto',
  indicatorColor = 'primary',
  textColor = 'primary',
  sx = {},
  ...props
}) {
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs
          value={value}
          onChange={onChange}
          variant={variant}
          orientation={orientation}
          centered={centered}
          scrollButtons={scrollButtons}
          indicatorColor={indicatorColor}
          textColor={textColor}
          {...props}
        >
          {tabs.map((tab, index) => (
            <MuiTab
              key={index}
              label={tab.label}
              icon={tab.icon}
              disabled={tab.disabled}
              sx={{
                minHeight: 48,
                textTransform: 'none',
                fontWeight: 500,
              }}
            />
          ))}
        </MuiTabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
}

export default Tabs;
