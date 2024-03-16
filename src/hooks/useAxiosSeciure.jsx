import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Authprovaider/Authprovaider';
import { useNavigate } from 'react-router-dom';
const axiosSeciure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSeciure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  axiosSeciure.interceptors.request.use(
    config => {
      const token = localStorage.getItem('ln-jwt-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosSeciure.interceptors.response.use(
    res => {
      return res;
    },
    error => {
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 403
      ) {
        logout().then().catch();
        navigate('/');
      }
    }
  );

  return axiosSeciure;
};

export default useAxiosSeciure;
