import useAdminOrInstructor from './useAdminOrInstructor';

const useInstructor = () => {
  const [adminOrInstructor] = useAdminOrInstructor();

  const isInstructor = adminOrInstructor?.isInstructor;
  return isInstructor;
};

export default useInstructor;
