import { useContext } from 'react';
import { AuthContext } from '../Authprovaider/Authprovaider';
import useAxiosSeciure from './useAxiosSeciure';
import { useQuery } from '@tanstack/react-query';

const usePayments = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSeciure = useAxiosSeciure();

  const { data: payments, refetch } = useQuery({
    queryKey: ['email'],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSeciure.get(`/payments/${user?.email}`);

      return data.data;
    },
  });
  return [payments, refetch];
};

export default usePayments;
