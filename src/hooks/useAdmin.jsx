import useAdminOrInstructor from './useAdminOrInstructor';

const useAdmin = () => {
  const adminOrInstructor = useAdminOrInstructor();
  const isAdmin = adminOrInstructor?.isAdmin;

  return isAdmin;
};

export default useAdmin;
