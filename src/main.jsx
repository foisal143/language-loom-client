import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes.jsx';
import Authprovaider from './Authprovaider/Authprovaider.jsx';
import { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovaider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </Authprovaider>
  </React.StrictMode>
);
