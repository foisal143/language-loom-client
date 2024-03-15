import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Login from '../pages/Login/Login';
import Registar from '../pages/Registar/Registar';
import Home from '../pages/Home/Home/Home';
import InstractorsPage from '../pages/InstructorsPage/InstructorsPage/InstractorsPage';
import ClassesPage from '../pages/ClassesPage/ClassesPage/ClassesPage';
import Dashboard from '../layouts/Dashboard';
import StudentHome from '../pages/StudentDashboard/StudentHome/StudentHome';
import MySelectClass from '../pages/StudentDashboard/MySelectClass/MySelectClass';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PaymentPage from '../pages/StudentDashboard/PaymentPage/PaymentPage';
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
        element: <InstractorsPage />,
      },
      {
        path: 'instructorClass/:id',
        element: <p>this is single class page</p>,
      },
      {
        path: 'classes',
        element: <ClassesPage />,
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
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <p>this is an error page</p>,
    children: [
      {
        path: 'studentHome',
        element: <StudentHome />,
      },
      {
        path: 'Select-Classes',
        element: <MySelectClass />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
    ],
  },
]);

export default router;
