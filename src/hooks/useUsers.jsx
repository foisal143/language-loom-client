import { useQuery } from '@tanstack/react-query';
import useAxiosSeciure from './useAxiosSeciure';
import { useContext } from 'react';
import { AuthContext } from '../Authprovaider/Authprovaider';

const useUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecuire = useAxiosSeciure();
  const { data: users, refetch } = useQuery({
    queryKey: ['user'],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSecuire.get('/users');
      return data.data;
    },
  });
  return [users, refetch];
};

export default useUsers;
