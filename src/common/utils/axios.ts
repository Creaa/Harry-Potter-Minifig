import axios, { AxiosInstance } from 'axios';
import { MINIFIG_BASE_URL, MINIFIG_API_VERSION, MINIFIG_API_KEY } from '@env';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${MINIFIG_BASE_URL}${MINIFIG_API_VERSION}/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `key ${MINIFIG_API_KEY}`,
  },
});

export default axiosInstance;
