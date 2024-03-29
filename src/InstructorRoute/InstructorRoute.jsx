import { useContext } from 'react';
import useInstructor from '../hooks/useInstructor';
import { AuthContext } from '../Authprovaider/Authprovaider';
import { Navigate } from 'react-router-dom';
import useAdminOrInstructor from '../hooks/useAdminOrInstructor';

const InstructorRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const isInstructor = useInstructor();

  const [, , isLoading] = useAdminOrInstructor();

  if (loading || isLoading) {
    return (
      <div className="h-[calc(100vh-80px)] flex justify-center items-center">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (isInstructor) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default InstructorRoute;
