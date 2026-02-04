import HomePage from '@/pages/Home/Home.page';
import ResponsiveLayout from '@/shared/layout/AppLayout';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ResponsiveLayout />,
     children: [
      { path: '/', element: <HomePage /> },
     
    ],
  },
]);