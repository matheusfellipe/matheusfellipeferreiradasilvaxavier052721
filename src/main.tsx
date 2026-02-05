import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './styles/global.css'
import './styles/tailwind.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import App from './App'
import { petTheme } from './shared/theme';
import { ModalsProvider } from '@mantine/modals'




createRoot(document.getElementById('root')!).render(
  
    <MantineProvider theme={petTheme}>
       <Notifications />
       <ModalsProvider>

            <App />
       </ModalsProvider>
    </MantineProvider>

)
