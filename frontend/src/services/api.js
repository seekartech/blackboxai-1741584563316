import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (credentials) => api.post('/login', credentials),
    logout: () => api.post('/logout'),
    getUser: () => api.get('/user'),
};

export const productsAPI = {
    getAll: (params) => api.get('/products', { params }),
    getOne: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    search: (query) => api.get('/products/search', { params: { query } }),
};

export const categoriesAPI = {
    getAll: () => api.get('/categories'),
    getOne: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post('/categories', data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`),
};

export const customersAPI = {
    getAll: (params) => api.get('/customers', { params }),
    getOne: (id) => api.get(`/customers/${id}`),
    create: (data) => api.post('/customers', data),
    update: (id, data) => api.put(`/customers/${id}`, data),
    delete: (id) => api.delete(`/customers/${id}`),
    search: (query) => api.get('/customers/search', { params: { query } }),
};

export const suppliersAPI = {
    getAll: (params) => api.get('/suppliers', { params }),
    getOne: (id) => api.get(`/suppliers/${id}`),
    create: (data) => api.post('/suppliers', data),
    update: (id, data) => api.put(`/suppliers/${id}`, data),
    delete: (id) => api.delete(`/suppliers/${id}`),
};

export const transactionsAPI = {
    getAll: (params) => api.get('/transactions', { params }),
    getOne: (id) => api.get(`/transactions/${id}`),
    create: (data) => api.post('/transactions', data),
    update: (id, data) => api.put(`/transactions/${id}`, data),
};

export const purchasesAPI = {
    getAll: (params) => api.get('/purchases', { params }),
    getOne: (id) => api.get(`/purchases/${id}`),
    create: (data) => api.post('/purchases', data),
    update: (id, data) => api.put(`/purchases/${id}`, data),
    receive: (id) => api.patch(`/purchases/${id}/receive`),
};

export const usersAPI = {
    getAll: (params) => api.get('/users', { params }),
    getOne: (id) => api.get(`/users/${id}`),
    create: (data) => api.post('/users', data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
    toggleActive: (id) => api.patch(`/users/${id}/toggle-active`),
};

export const dashboardAPI = {
    getStats: () => api.get('/dashboard/stats'),
    getCashierStats: () => api.get('/dashboard/cashier-stats'),
    getPurchasingStats: () => api.get('/dashboard/purchasing-stats'),
};

export const reportsAPI = {
    getSales: (params) => api.get('/reports/sales', { params }),
    getPurchases: (params) => api.get('/reports/purchases', { params }),
    getInventory: () => api.get('/reports/inventory'),
    getProfit: (params) => api.get('/reports/profit', { params }),
};

export default api;
