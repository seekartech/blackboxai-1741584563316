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
  required,
  fullWidth = true,
  size = 'medium',
  margin = 'normal',
  disabled = false,
  multiple = false,
  placeholder = 'Select an option',
  valueKey = 'value',
  labelKey = 'label',
  ...props
}) {
  return (
    <FormControl
      error={!!error}
      required={required}
      fullWidth={fullWidth}
      size={size}
      margin={margin}
      disabled={disabled}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect
        value={value}
        onChange={onChange}
        label={label}
        multiple={multiple}
        displayEmpty
        {...props}
      >
        {!multiple && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option[valueKey] || option}
            value={option[valueKey] || option}
          >
            {option[labelKey] || option}
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
