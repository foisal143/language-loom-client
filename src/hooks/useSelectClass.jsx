import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Authprovaider/Authprovaider';
import useAxiosSeciure from './useAxiosSeciure';

const useSelectClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSeciure = useAxiosSeciure();
  const { data: selectClass, refetch } = useQuery({
    queryKey: ['class'],
    queryFn: async () => {
      const data = await axiosSeciure.get(`/selectedClasses/${user?.email}`);

      return data.data;
    },
  });
  return [selectClass, refetch];
};

export default useSelectClass;
