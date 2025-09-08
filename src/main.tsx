import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Routes from '@/routes/Routes.tsx';
import { RouterProvider } from 'react-router-dom';
const { routes } = Routes()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
