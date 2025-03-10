import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard';
import NotFound from '../pages/NotFound';
import ComponentTest from '../pages/ComponentTest';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  // For testing purposes, we'll always allow access
  // In production, you would check authentication status
  return children;
};

function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="test-components" element={<ComponentTest />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
