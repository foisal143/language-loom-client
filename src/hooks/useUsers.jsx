import { useQuery } from '@tanstack/react-query';
import useAxiosSeciure from './useAxiosSeciure';

const useUsers = () => {
  const axiosSecuire = useAxiosSeciure();
  const { data: users, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await axiosSecuire.get('/users');
      return data.data;
    },
  });
  return [users, refetch];
};

export default useUsers;
