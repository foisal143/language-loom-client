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
import MyEnrolledClass from '../pages/StudentDashboard/MyEnrolledClass/MyEnrolledClass';
import PaymentHistory from '../pages/StudentDashboard/PymentHistory/PaymentHistory';
import AdminHome from '../pages/AdminDashboard/AdminHome/AdminHome';
import ManagesClasses from '../pages/AdminDashboard/ManageClasses/ManagesClasses';
import ManageUsers from '../pages/AdminDashboard/ManageUsers/ManageUsers';
import InstructorHome from '../pages/InstructorDashboard/InstructorHome/InstructorHome';
import AddClassPage from '../pages/InstructorDashboard/AddClassPage/AddClassPage';
import MyClass from '../pages/InstructorDashboard/MyClass/MyClass';
import AdminRoute from '../AdminRoute/AdminRoute';
import InstructorRoute from '../InstructorRoute/InstructorRoute';
import InstructorClasses from '../pages/InstructorClasses/InstructorClasses';
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
        path: 'instructorClass/:email',
        element: <InstructorClasses />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/classes?email=${params.email}`),
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
      // student routes
      {
        path: 'studentHome',
        element: (
          <PrivateRoute>
            <StudentHome />
          </PrivateRoute>
        ),
      },
      {
        path: 'Select-Classes',
        element: (
          <PrivateRoute>
            <MySelectClass />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment/:id',
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/classes/${params.id}`),
      },
      {
        path: 'enrolled-class',
        element: (
          <PrivateRoute>
            <MyEnrolledClass />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-history',
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      // admin route here
      {
        path: 'adminHome',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-classes',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManagesClasses></ManagesClasses>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              {' '}
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      // instructor route
      {
        path: 'instructorHome',
        element: (
          <PrivateRoute>
            <InstructorRoute>
              <InstructorHome />
            </InstructorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-Class',
        element: (
          <PrivateRoute>
            <InstructorRoute>
              <AddClassPage />
            </InstructorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-class',
        element: (
          <PrivateRoute>
            <InstructorRoute>
              <MyClass />
            </InstructorRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
