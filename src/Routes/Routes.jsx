import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Login from '../pages/Login/Login';
import Registar from '../pages/Registar/Registar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <p>this is error page</p>,
    children: [
      {
        path: '/',
        element: <p>this is home</p>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registar',
        element: <Registar />,
      },
    ],
  },
]);

export default router;
