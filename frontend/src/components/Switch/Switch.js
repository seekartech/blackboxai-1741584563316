import React from 'react';
import {
  Switch as MuiSwitch,
  FormControlLabel,
  FormHelperText,
  FormControl,
  styled,
} from '@mui/material';

// Styled Switch with custom styles
const StyledSwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.primary.main,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.grey[400],
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function Switch({
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
  labelPlacement = 'end',
  ...props
}) {
  const switch_ = (
    <StyledSwitch
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
    return switch_;
  }

  return (
    <FormControl error={!!error} required={required}>
      <FormControlLabel
        control={switch_}
        label={label}
        labelPlacement={labelPlacement}
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

export default Switch;
