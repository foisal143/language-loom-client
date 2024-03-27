import { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../Authprovaider/Authprovaider';
import useAdminOrInstructor from '../hooks/useAdminOrInstructor';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);

  const [, , isLoading] = useAdminOrInstructor();
  const isAdmin = useAdmin();
  if (loading || isLoading) {
    return (
      <div className="h-[calc(100vh-80px)] flex justify-center items-center">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (isAdmin) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
