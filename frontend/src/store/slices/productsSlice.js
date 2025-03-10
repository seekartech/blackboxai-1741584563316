import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
  filters: {
    search: '',
    category: '',
    status: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setSelectedProduct,
  setFilters,
  setPagination,
  addProduct,
  updateProduct,
  deleteProduct,
  resetState,
} = productsSlice.actions;

export default productsSlice.reducer;
