import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedCategory: null,
  filters: {
    search: '',
    status: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setCategories,
  setLoading,
  setError,
  setSelectedCategory,
  setFilters,
  setPagination,
  addCategory,
  updateCategory,
  deleteCategory,
  resetState,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
