import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Authprovaider/Authprovaider';

const useSelectClass = () => {
  const { user } = useContext(AuthContext);
  const { data: selectClass, refetch } = useQuery({
    queryKey: ['class'],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/selectedClasses/${user?.email}`
      );
      const data = res.json();
      return data;
    },
  });
  return [selectClass, refetch];
};

export default useSelectClass;
