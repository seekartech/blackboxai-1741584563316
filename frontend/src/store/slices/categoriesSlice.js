import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesAPI } from '../../services/api';
import toast from 'react-hot-toast';

// Async thunks
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await categoriesAPI.getAll();
            return response.data.categories;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

export const fetchCategory = createAsyncThunk(
    'categories/fetchCategory',
    async (id, { rejectWithValue }) => {
        try {
            const response = await categoriesAPI.getOne(id);
            return response.data.category;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch category');
        }
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await categoriesAPI.create(categoryData);
            return response.data.category;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create category');
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await categoriesAPI.update(id, data);
            return response.data.category;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update category');
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            await categoriesAPI.delete(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
        }
    }
);

const initialState = {
    items: [],
    selectedCategory: null,
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Categories
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Fetch Single Category
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Create Category
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
                toast.success('Category created successfully');
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Update Category
        builder
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.selectedCategory = action.payload;
                toast.success('Category updated successfully');
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });

        // Delete Category
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
                toast.success('Category deleted successfully');
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export const { clearError, clearSelectedCategory } = categoriesSlice.actions;

// Selectors
export const selectCategories = (state) => state.categories.items;
export const selectSelectedCategory = (state) => state.categories.selectedCategory;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;
