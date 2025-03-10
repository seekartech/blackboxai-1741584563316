import React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  size = 'small',
  fullWidth = true,
  loading = false,
  debounceMs = 300,
  disabled = false,
  sx = {},
  ...props
}) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, debounceMs]);

  React.useEffect(() => {
    if (debouncedValue !== value) {
      onChange?.(debouncedValue);
    }
  }, [debouncedValue]);

  const handleClear = (event) => {
    event.stopPropagation();
    onClear?.();
  };

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TextField
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {loading ? (
                <CircularProgress size={20} />
              ) : value ? (
                <IconButton
                  size="small"
                  onClick={handleClear}
                  disabled={disabled}
                  sx={{ mr: -1 }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Box>
  );
}

export default SearchInput;
