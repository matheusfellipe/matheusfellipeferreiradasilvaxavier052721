import { lazy, Suspense } from 'react';
import HomePage from '@/pages/Home/Home.page';
import LoginPage from '@/pages/Login/Login.page';
import ResponsiveLayout from '@/shared/layout/AppLayout';
import { Navigate, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoadingFallback } from './LoadingFallback';

// Lazy loaded components
const PetPage = lazy(() => import('@/pages/Pet/Pet.page'));

const PATH_HOME = '/home';
const PATH_LOGIN = '/login';
const PATH_PET = {
  root: '/pets',
  create: '/pets/create',
  details: '/pets/:id',
  edit: '/pets/edit/:id',
}

export const routes = (
  <>
    <Route path={PATH_LOGIN} element={<LoginPage />} />
    
    <Route element={<ProtectedRoute><ResponsiveLayout /></ProtectedRoute>}>
      <Route path={PATH_HOME} element={<HomePage />} />
      
      <Route path={PATH_PET.root}>
        <Route index element={<Navigate to={PATH_HOME} replace />} />
        <Route 
          path="create" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PetPage />
            </Suspense>
          } 
        />
        <Route path=":id" element={<div>pet details</div>} />
        <Route 
          path="edit/:id" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PetPage />
            </Suspense>
          } 
        />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to={PATH_LOGIN} replace />} />
  </>
);
