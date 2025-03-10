import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { purchasesAPI } from '../../services/api';
import toast from 'react-hot-toast';

// Async thunks
export const fetchPurchases = createAsyncThunk(
    'purchases/fetchPurchases',
    async (params, { rejectWithValue }) => {
        try {
            const response = await purchasesAPI.getAll(params);
            return response.data.purchases;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch purchases');
        }
    }
);

export const fetchPurchase = createAsyncThunk(
    'purchases/fetchPurchase',
    async (id, { rejectWithValue }) => {
        try {
            const response = await purchasesAPI.getOne(id);
            return response.data.purchase;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch purchase');
        }
    }
);

export const createPurchase = createAsyncThunk(
    'purchases/createPurchase',
    async (purchaseData, { rejectWithValue }) => {
        try {
            const response = await purchasesAPI.create(purchaseData);
            return response.data.purchase;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create purchase');
        }
    }
);

export const updatePurchase = createAsyncThunk(
    'purchases/updatePurchase',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await purchasesAPI.update(id, data);
            return response.data.purchase;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update purchase');
        }
    }
);

export const receivePurchase = createAsyncThunk(
    'purchases/receivePurchase',
    async (id, { rejectWithValue }) => {
        try {
            const response = await purchasesAPI.receive(id);
            return response.data.purchase;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to receive purchase');
        }
    }
);

const initialState = {
    items: [],
    selectedPurchase: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 15,
    },
    loading: false,
    error: null,
    // Draft state for new purchase order
    draft: {
        items: [],
        supplier: null,
        subtotal: 0,
        tax: 0,
        total: 0,
    },
};

const calculateDraftTotals = (draft) => {
    const subtotal = draft.items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const tax = 0; // Add tax calculation if needed
    const total = subtotal + tax;

    return { subtotal, tax, total };
};

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedPurchase: (state) => {
            state.selectedPurchase = null;
        },
        // Draft actions
        addToDraft: (state, action) => {
            const { product, quantity, price } = action.payload;
            const existingItem = state.draft.items.find(item => item.product_id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.subtotal = existingItem.quantity * existingItem.price;
            } else {
                state.draft.items.push({
                    product_id: product.id,
                    product: product,
                    quantity: quantity,
                    price: price || product.buy_price,
                    subtotal: quantity * (price || product.buy_price),
                });
            }

            const totals = calculateDraftTotals(state.draft);
            state.draft = { ...state.draft, ...totals };
        },
        updateDraftItem: (state, action) => {
            const { product_id, quantity, price } = action.payload;
            const item = state.draft.items.find(item => item.product_id === product_id);

            if (item) {
                item.quantity = quantity;
                item.price = price;
                item.subtotal = quantity * price;

                const totals = calculateDraftTotals(state.draft);
                state.draft = { ...state.draft, ...totals };
            }
        },
        removeFromDraft: (state, action) => {
            const product_id = action.payload;
            state.draft.items = state.draft.items.filter(item => item.product_id !== product_id);

            const totals = calculateDraftTotals(state.draft);
            state.draft = { ...state.draft, ...totals };
        },
        setSupplier: (state, action) => {
            state.draft.supplier = action.payload;
        },
        clearDraft: (state) => {
            state.draft = {
                items: [],
                supplier: null,
                subtotal: 0,
                tax: 0,
                total: 0,
            };
        },
    },
    extraReducers: (builder) => {
        // Fetch Purchases
        builder
            .addCase(fetchPurchases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPurchases.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.pagination = {
                    currentPage: action.payload.current_page,
                    totalPages: action.payload.last_page,
                    totalItems: action.payload.total,
                    perPage: action.payload.per_page,
                };
            })
            .addCase(fetchPurchases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Fetch Single Purchase
        builder
            .addCase(fetchPurchase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPurchase.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPurchase = action.payload;
            })
            .addCase(fetchPurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Create Purchase
        builder
            .addCase(createPurchase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPurchase.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
                state.draft = initialState.draft; // Clear draft after successful creation
                toast.success('Purchase order created successfully');
            })
            .addCase(createPurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Update Purchase
        builder
            .addCase(updatePurchase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePurchase.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.selectedPurchase = action.payload;
                toast.success('Purchase order updated successfully');
            })
            .addCase(updatePurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Receive Purchase
        builder
            .addCase(receivePurchase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(receivePurchase.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.selectedPurchase = action.payload;
                toast.success('Purchase order received successfully');
            })
            .addCase(receivePurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export const {
    clearError,
    clearSelectedPurchase,
    addToDraft,
    updateDraftItem,
    removeFromDraft,
    setSupplier,
    clearDraft,
} = purchasesSlice.actions;

// Selectors
export const selectPurchases = (state) => state.purchases.items;
export const selectSelectedPurchase = (state) => state.purchases.selectedPurchase;
export const selectPurchasesPagination = (state) => state.purchases.pagination;
export const selectPurchasesLoading = (state) => state.purchases.loading;
export const selectPurchasesError = (state) => state.purchases.error;
export const selectDraft = (state) => state.purchases.draft;

export default purchasesSlice.reducer;
