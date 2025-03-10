import React from 'react';
import {
  Switch as MuiSwitch,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  helperText,
  color = 'primary',
  size = 'medium',
  sx = {},
  ...props
}) {
  const switch_ = (
    <MuiSwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      color={color}
      size={size}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: error ? 'error.main' : undefined,
          '& + .MuiSwitch-track': {
            backgroundColor: error ? 'error.main' : undefined,
          },
        },
        ...sx,
      }}
      {...props}
    />
  );

  if (label || error || helperText) {
    return (
      <FormControl error={!!error}>
        <FormControlLabel
          control={switch_}
          label={label}
          disabled={disabled}
        />
        {(error || helperText) && (
          <FormHelperText>{error || helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }

  return switch_;
}

export default Switch;
