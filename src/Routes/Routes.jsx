import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Login from '../pages/Login/Login';
import Registar from '../pages/Registar/Registar';
import Home from '../pages/Home/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <p>this is error page</p>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'instractors',
        element: <p>this is instractor page</p>,
      },
      {
        path: 'classes',
        element: <p>this is classes page</p>,
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
