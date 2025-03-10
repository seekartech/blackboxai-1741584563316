import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedPurchase: null,
  filters: {
    search: '',
    status: '',
    dateRange: {
      start: null,
      end: null,
    },
    supplier: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  stats: {
    totalAmount: 0,
    totalPurchases: 0,
    averageAmount: 0,
  },
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    setPurchases: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedPurchase: (state, action) => {
      state.selectedPurchase = action.payload;
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
    addPurchase: (state, action) => {
      state.items.push(action.payload);
    },
    updatePurchase: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deletePurchase: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPurchases,
  setLoading,
  setError,
  setSelectedPurchase,
  setFilters,
  setPagination,
  setStats,
  addPurchase,
  updatePurchase,
  deletePurchase,
  resetState,
} = purchasesSlice.actions;

export default purchasesSlice.reducer;
