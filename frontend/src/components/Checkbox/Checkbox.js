import React from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
  styled,
} from '@mui/material';

// Styled Checkbox with custom styles
const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  padding: 9,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      animation: 'pulse 200ms',
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(0.9)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  error,
  helperText,
  color = 'primary',
  size = 'medium',
  indeterminate = false,
  required = false,
  name,
  value,
  sx = {},
  ...props
}) {
  const checkbox = (
    <StyledCheckbox
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      color={color}
      size={size}
      indeterminate={indeterminate}
      required={required}
      name={name}
      value={value}
      {...props}
    />
  );

  if (!label && !helperText) {
    return checkbox;
  }

  return (
    <FormControl error={!!error} required={required}>
      <FormControlLabel
        control={checkbox}
        label={label}
        sx={{
          marginLeft: 0,
          marginRight: 0,
          '& .MuiFormControlLabel-label': {
            fontSize: size === 'small' ? 14 : 16,
          },
          ...sx,
        }}
      />
      {(error || helperText) && (
        <FormHelperText error={!!error} sx={{ mx: 0 }}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

// Checkbox Group component for handling multiple checkboxes
function CheckboxGroup({
  options = [],
  value = [],
  onChange,
  error,
  helperText,
  disabled = false,
  color = 'primary',
  size = 'medium',
  required = false,
  row = false,
  sx = {},
}) {
  const handleChange = (option) => (event) => {
    const newValue = event.target.checked
      ? [...value, option.value]
      : value.filter((v) => v !== option.value);
    onChange?.(newValue);
  };

  return (
    <FormControl error={!!error} required={required} sx={sx}>
      <div
        style={{
          display: 'flex',
          flexDirection: row ? 'row' : 'column',
          gap: row ? '16px' : '8px',
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <StyledCheckbox
                checked={value.includes(option.value)}
                onChange={handleChange(option)}
                disabled={disabled || option.disabled}
                color={color}
                size={size}
              />
            }
            label={option.label}
          />
        ))}
      </div>
      {(error || helperText) && (
        <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

Checkbox.Group = CheckboxGroup;

export default Checkbox;
