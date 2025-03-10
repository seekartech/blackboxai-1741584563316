import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@mui/material';

function Select({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  fullWidth = true,
  required = false,
  disabled = false,
  size = 'medium',
  sx = {},
  ...props
}) {
  const id = React.useId();
  const labelId = `${id}-label`;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={!!error}
      required={required}
      disabled={disabled}
      size={size}
      sx={sx}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        value={value}
        onChange={onChange}
        label={label}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default Select;
