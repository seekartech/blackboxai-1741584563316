import React from 'react';
import {
  Radio as MuiRadio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  styled,
} from '@mui/material';

// Styled Radio with custom styles
const StyledRadio = styled(MuiRadio)(({ theme }) => ({
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

function Radio({
  checked,
  onChange,
  label,
  disabled = false,
  error,
  helperText,
  color = 'primary',
  size = 'medium',
  required = false,
  name,
  value,
  sx = {},
  ...props
}) {
  const radio = (
    <StyledRadio
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      color={color}
      size={size}
      required={required}
      name={name}
      value={value}
      {...props}
    />
  );

  if (!label && !helperText) {
    return radio;
  }

  return (
    <FormControl error={!!error} required={required}>
      <FormControlLabel
        control={radio}
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

// Radio Group component for handling multiple radio buttons
function RadioGroupComponent({
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  color = 'primary',
  size = 'medium',
  required = false,
  row = false,
  name,
  sx = {},
}) {
  return (
    <FormControl error={!!error} required={required} sx={sx}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        value={value}
        onChange={onChange}
        row={row}
        name={name}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <StyledRadio
                disabled={disabled || option.disabled}
                color={color}
                size={size}
              />
            }
            label={option.label}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: size === 'small' ? 14 : 16,
              },
            }}
          />
        ))}
      </RadioGroup>
      {(error || helperText) && (
        <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

Radio.Group = RadioGroupComponent;

export default Radio;
