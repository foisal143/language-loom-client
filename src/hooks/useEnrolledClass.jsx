import { useQuery } from '@tanstack/react-query';
import useAxiosSeciure from './useAxiosSeciure';
import { useContext } from 'react';
import { AuthContext } from '../Authprovaider/Authprovaider';

const useEnrolledClass = () => {
  const axiosSeciure = useAxiosSeciure();
  const { user, loading } = useContext(AuthContext);
  const { data: enrolledClass, refetch } = useQuery({
    queryKey: ['email'],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSeciure.get(`/enrolled-class/${user?.email}`);
      return data.data;
    },
  });

  return [enrolledClass, refetch];
};

export default useEnrolledClass;
