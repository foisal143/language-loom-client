import { useContext } from 'react';
import useAxiosSeciure from './useAxiosSeciure';
import { AuthContext } from '../Authprovaider/Authprovaider';
import { useQuery } from '@tanstack/react-query';

const useAdminOrInstructor = () => {
  const axiosSeciure = useAxiosSeciure();
  const { user, loading } = useContext(AuthContext);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['user'],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSeciure.get(`/users?email=${user?.email}`);
      return data.data;
    },
  });

  if (data) {
    return [data, refetch, isLoading];
  } else {
    return [];
  }
};

export default useAdminOrInstructor;
