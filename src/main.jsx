import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes.jsx';
import Authprovaider from './Authprovaider/Authprovaider.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvaider from './ThemeProvaider/ThemeProvaider.jsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvaider>
        <Authprovaider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </Authprovaider>
      </ThemeProvaider>
    </QueryClientProvider>
  </React.StrictMode>
);
