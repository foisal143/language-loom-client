import { useQuery } from '@tanstack/react-query';
import useAxiosSeciure from './useAxiosSeciure';

const useClasses = () => {
  const axiosSecuire = useAxiosSeciure();
  const { data: classes, refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const data = await axiosSecuire.get('/classes');
      return data.data;
    },
  });

  return [classes, refetch];
};

export default useClasses;
