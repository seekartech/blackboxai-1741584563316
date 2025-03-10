import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../store/slices/authSlice';

// Layout
import Layout from '../components/Layout';

// Lazy load pages
const Login = React.lazy(() => import('../pages/auth/Login'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const Products = React.lazy(() => import('../pages/products'));
const Categories = React.lazy(() => import('../pages/categories'));
const Sales = React.lazy(() => import('../pages/sales'));
const Purchases = React.lazy(() => import('../pages/purchases'));
const Customers = React.lazy(() => import('../pages/customers'));
const Users = React.lazy(() => import('../pages/users'));
const Reports = React.lazy(() => import('../pages/reports'));
const Settings = React.lazy(() => import('../pages/settings'));
const Profile = React.lazy(() => import('../pages/profile'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <Layout>{children}</Layout>;
};

// Routes configuration
export default function Router() {
  return useRoutes([
    {
      path: '/login',
      element: (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Login />
        </React.Suspense>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute allowedRoles={['super_admin', 'admin', 'cashier', 'purchasing']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/products',
      element: (
        <ProtectedRoute allowedRoles={['super_admin', 'admin', 'cashier', 'purchasing']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Products />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/categories',
      element: (
        <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Categories />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/sales',
      element: (
        <ProtectedRoute allowedRoles={['super_admin', 'admin', 'cashier']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Sales />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/purchases',
      element: (
        <ProtectedRoute allowedRoles={['super_admin', 'admin', 'purchasing']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Purchases />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/customers',
      element: (
        <ProtectedRoute allowedRoles={['super_admin', 'admin', 'cashier']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Customers />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/users',
      element: (
        <ProtectedRoute allowedRoles={['super_admin']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Users />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/reports',
      element: (
        <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Reports />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/settings',
      element: (
        <ProtectedRoute allowedRoles={['super_admin']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Settings />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute allowedRoles={['super_admin', 'admin', 'cashier', 'purchasing']}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </React.Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '*',
      element: (
        <React.Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </React.Suspense>
      ),
    },
  ]);
}
