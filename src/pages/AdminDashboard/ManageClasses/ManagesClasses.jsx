import useClasses from '../../../hooks/useClasses';

const ManagesClasses = () => {
  const [classes, refetch] = useClasses();

  return <div>this is manage classes page</div>;
};

export default ManagesClasses;
