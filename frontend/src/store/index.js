import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import slices
import authSlice from './slices/authSlice';
import productsSlice from './slices/productsSlice';
import categoriesSlice from './slices/categoriesSlice';
import transactionsSlice from './slices/transactionsSlice';
import purchasesSlice from './slices/purchasesSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  products: productsSlice,
  categories: categoriesSlice,
  transactions: transactionsSlice,
  purchases: purchasesSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
