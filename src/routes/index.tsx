import HomePage from '@/pages/Home/Home.page';
import LoginPage from '@/pages/Login/Login.page';
import ResponsiveLayout from '@/shared/layout/AppLayout';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';


export const routes: RouteObject[] = [
  {
    path: 'authentication/login',
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <ResponsiveLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'pets', element: <HomePage /> },
      
    ],
  },
  {
    path: '*',
    element: <Navigate to="/authentication/login" replace />,
  },
];
