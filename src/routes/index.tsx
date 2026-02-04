import PetsIndex from '@/app/pets';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PetsIndex />,
  },
]);