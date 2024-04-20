import axios, { AxiosInstance } from 'axios';
import MMKVstorage from '../utils/mmkv';

const createApiClient = (): AxiosInstance => {

  const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org",
    headers: {
      'Content-Type': 'application/json',
    }
  });
  // Interceptors, headers, etc.
  axiosInstance.interceptors.request.use((config) => {
    const id = MMKVstorage.getString('userId');
    config.headers.Authorization = !id ? null : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGNiNGU5MjZhNjhkYjFhZjQ2YWRmYmNjNjRhMmY2YiIsInN1YiI6IjY2MjFhMTRiOTY2MWZjMDEzMmZmODNiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9oiW7qj90QtdMPfzqre-px6chyaxuGytZV1a1SiRIsk`
    return config
  }, error => {
    return Promise.reject(error)
  })
  return axiosInstance;
};

export default createApiClient;
