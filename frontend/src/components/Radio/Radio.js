import React from 'react';
import {
  Radio as MuiRadio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material';

function Radio({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  color = 'primary',
  size = 'medium',
  row = false,
  disabled = false,
  required = false,
  sx = {},
  ...props
}) {
  return (
    <FormControl
      error={!!error}
      required={required}
      disabled={disabled}
      sx={sx}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        value={value}
        onChange={onChange}
        row={row}
        {...props}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <MuiRadio
                color={color}
                size={size}
                disabled={option.disabled}
              />
            }
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </RadioGroup>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default Radio;
