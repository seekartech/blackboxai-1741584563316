import React from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  helperText,
  color = 'primary',
  size = 'medium',
  indeterminate = false,
  sx = {},
  ...props
}) {
  const checkbox = (
    <MuiCheckbox
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      color={color}
      size={size}
      indeterminate={indeterminate}
      sx={{
        '&.Mui-checked': {
          color: error ? 'error.main' : undefined,
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
          control={checkbox}
          label={label}
          disabled={disabled}
        />
        {(error || helperText) && (
          <FormHelperText>{error || helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }

  return checkbox;
}

export default Checkbox;
