import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/tailwind.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.tsx'
import { MantineProvider } from '@mantine/core'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)
