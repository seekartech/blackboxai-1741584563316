import React from 'react';
import {
  InputBase,
  IconButton,
  Paper,
  InputAdornment,
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
  loading = false,
  debounceMs = 300,
  fullWidth = true,
  size = 'medium',
  sx = {},
  ...props
}) {
  const [inputValue, setInputValue] = React.useState(value);
  const debounceTimer = React.useRef(null);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  };

  const handleClear = () => {
    setInputValue('');
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: fullWidth ? '100%' : 'auto',
        ...sx,
      }}
    >
      <InputBase
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth
        size={size}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              inputValue && (
                <IconButton
                  size="small"
                  onClick={handleClear}
                  aria-label="clear search"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )
            )}
          </InputAdornment>
        }
        {...props}
      />
    </Paper>
  );
}

export default SearchInput;
