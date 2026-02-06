import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import GuestLayout from '../components/layouts/GuestLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Main Pages
import Dashboard from '../pages/Dashboard';
import Welcome from '../pages/Welcome';

// Rekam Medis
import RekamMedis from '../pages/rekam-medis/RekamMedis';
import TambahRekamMedis from '../pages/rekam-medis/TambahRekamMedis';
import RekamMedisDetails from '../pages/rekam-medis/RekamMedisDetails';

// Rawat Jalan
import RawatJalan from '../pages/rawat-jalan/RawatJalan';

// Rawat Inap
import RawatInap from '../pages/rawat-inap/RawatInap';

// Gawat Darurat
import GawatDarurat from '../pages/gawat-darurat/GawatDarurat';

// User Management
import UserManagement from '../pages/user-management/UserManagement';
import TambahUser from '../pages/user-management/TambahUser';
import EditUser from '../pages/user-management/EditUser';

// Profile
import Profile from '../pages/profile/Profile';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <GuestLayout>{children}</GuestLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      
      {/* Guest Routes */}
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Rekam Medis */}
      <Route path="/rekam-medis" element={<ProtectedRoute><RekamMedis /></ProtectedRoute>} />
      <Route path="/rekam-medis/create" element={<ProtectedRoute><TambahRekamMedis /></ProtectedRoute>} />
      <Route path="/rekam-medis/:id" element={<ProtectedRoute><RekamMedisDetails /></ProtectedRoute>} />
      
      {/* Rawat Jalan */}
      <Route path="/rawat-jalan" element={<ProtectedRoute><RawatJalan /></ProtectedRoute>} />
      
      {/* Rawat Inap */}
      <Route path="/rawat-inap" element={<ProtectedRoute><RawatInap /></ProtectedRoute>} />
      
      {/* Gawat Darurat */}
      <Route path="/gawat-darurat" element={<ProtectedRoute><GawatDarurat /></ProtectedRoute>} />
      
      {/* User Management */}
      <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="/user-management/create" element={<ProtectedRoute><TambahUser /></ProtectedRoute>} />
      <Route path="/user-management/:id/edit" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
      
      {/* Profile */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
