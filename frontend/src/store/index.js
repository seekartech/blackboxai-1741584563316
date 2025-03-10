import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import transactionsReducer from './slices/transactionsSlice';
import purchasesReducer from './slices/purchasesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        categories: categoriesReducer,
        transactions: transactionsReducer,
        purchases: purchasesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.timestamp', 'meta.arg'],
                // Ignore these paths in the state
                ignoredPaths: [
                    'transactions.cart.items.product',
                    'purchases.draft.items.product',
                ],
            },
        }),
});

export default store;

// Hooks for TypeScript support (even though we're not using TypeScript)
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
