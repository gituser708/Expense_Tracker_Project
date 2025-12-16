import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { cookieUseMeAPI } from './url';

const fetchMe = async () => {
  try {
    const { data } = await axios.get(cookieUseMeAPI,
      {
        withCredentials: true 
      });
    return data.user || null;
  } catch (err) {
    return null
  };
};

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
