import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedTransaction: null,
  filters: {
    search: '',
    status: '',
    dateRange: {
      start: null,
      end: null,
    },
    customer: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  stats: {
    totalAmount: 0,
    totalTransactions: 0,
    averageAmount: 0,
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    addTransaction: (state, action) => {
      state.items.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setTransactions,
  setLoading,
  setError,
  setSelectedTransaction,
  setFilters,
  setPagination,
  setStats,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  resetState,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
