import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { transactionsAPI } from '../../services/api';
import toast from 'react-hot-toast';

// Async thunks
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (params, { rejectWithValue }) => {
        try {
            const response = await transactionsAPI.getAll(params);
            return response.data.transactions;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions');
        }
    }
);

export const fetchTransaction = createAsyncThunk(
    'transactions/fetchTransaction',
    async (id, { rejectWithValue }) => {
        try {
            const response = await transactionsAPI.getOne(id);
            return response.data.transaction;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch transaction');
        }
    }
);

export const createTransaction = createAsyncThunk(
    'transactions/createTransaction',
    async (transactionData, { rejectWithValue }) => {
        try {
            const response = await transactionsAPI.create(transactionData);
            return response.data.transaction;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create transaction');
        }
    }
);

export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await transactionsAPI.update(id, data);
            return response.data.transaction;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update transaction');
        }
    }
);

const initialState = {
    items: [],
    selectedTransaction: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 15,
    },
    loading: false,
    error: null,
    // Cart state for new transaction
    cart: {
        items: [],
        customer: null,
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
    },
};

const calculateCartTotals = (cart) => {
    const subtotal = cart.items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const tax = 0; // Add tax calculation if needed
    const discount = cart.customer?.discount_rate 
        ? (subtotal * cart.customer.discount_rate / 100)
        : 0;
    const total = subtotal + tax - discount;

    return { subtotal, tax, discount, total };
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedTransaction: (state) => {
            state.selectedTransaction = null;
        },
        // Cart actions
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;
            const existingItem = state.cart.items.find(item => item.product_id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.subtotal = existingItem.quantity * existingItem.price;
            } else {
                state.cart.items.push({
                    product_id: product.id,
                    product: product,
                    quantity: quantity,
                    price: product.sell_price,
                    subtotal: quantity * product.sell_price,
                });
            }

            const totals = calculateCartTotals(state.cart);
            state.cart = { ...state.cart, ...totals };
        },
        updateCartItem: (state, action) => {
            const { product_id, quantity } = action.payload;
            const item = state.cart.items.find(item => item.product_id === product_id);

            if (item) {
                item.quantity = quantity;
                item.subtotal = quantity * item.price;

                const totals = calculateCartTotals(state.cart);
                state.cart = { ...state.cart, ...totals };
            }
        },
        removeFromCart: (state, action) => {
            const product_id = action.payload;
            state.cart.items = state.cart.items.filter(item => item.product_id !== product_id);

            const totals = calculateCartTotals(state.cart);
            state.cart = { ...state.cart, ...totals };
        },
        setCustomer: (state, action) => {
            state.cart.customer = action.payload;
            const totals = calculateCartTotals(state.cart);
            state.cart = { ...state.cart, ...totals };
        },
        clearCart: (state) => {
            state.cart = {
                items: [],
                customer: null,
                subtotal: 0,
                tax: 0,
                discount: 0,
                total: 0,
            };
        },
    },
    extraReducers: (builder) => {
        // Fetch Transactions
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.pagination = {
                    currentPage: action.payload.current_page,
                    totalPages: action.payload.last_page,
                    totalItems: action.payload.total,
                    perPage: action.payload.per_page,
                };
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Fetch Single Transaction
        builder
            .addCase(fetchTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTransaction = action.payload;
            })
            .addCase(fetchTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Create Transaction
        builder
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
                state.cart = initialState.cart; // Clear cart after successful transaction
                toast.success('Transaction completed successfully');
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Update Transaction
        builder
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.selectedTransaction = action.payload;
                toast.success('Transaction updated successfully');
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export const {
    clearError,
    clearSelectedTransaction,
    addToCart,
    updateCartItem,
    removeFromCart,
    setCustomer,
    clearCart,
} = transactionsSlice.actions;

// Selectors
export const selectTransactions = (state) => state.transactions.items;
export const selectSelectedTransaction = (state) => state.transactions.selectedTransaction;
export const selectTransactionsPagination = (state) => state.transactions.pagination;
export const selectTransactionsLoading = (state) => state.transactions.loading;
export const selectTransactionsError = (state) => state.transactions.error;
export const selectCart = (state) => state.transactions.cart;

export default transactionsSlice.reducer;
