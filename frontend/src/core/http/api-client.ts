import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { envVariables } from '../constants';

export const getBaseURL = (key: string): string => {
  const apiURL = process.env[key];
  if (!apiURL) throw new Error('missing base API url');
  return apiURL || '';
};

export const HTTPInstance = axios.create({
  baseURL: getBaseURL(envVariables.localEnv.apiURL),
  headers: {
    'Content-Type': 'application/json',
  },
});

HTTPInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Authorization header if a token is present
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

HTTPInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // const message = error.response?.data.message || error.message;
    // use Notification e.g. snackbar
    // const originalRequest = error.config;

    // // Handle 401 Unauthorized
    // if (error.response?.status === 401) {
    //   // If refresh token exists, try to get new access token
    //   const refreshToken = localStorage.getItem('refreshToken');

    //   if (refreshToken && originalRequest) {
    //     try {
    //       const response = await axios.post('/api/auth/refresh', {
    //         refresh_token: refreshToken,
    //       });

    //       const { token } = response.data;
    //       localStorage.setItem('token', token);

    //       // Retry original request with new token
    //       if (originalRequest.headers) {
    //         originalRequest.headers.Authorization = `Bearer ${token}`;
    //       }
    //       return axios(originalRequest);
    //     } catch (refreshError) {
    //       // If refresh fails, logout user
    //       localStorage.removeItem('token');
    //       localStorage.removeItem('refreshToken');
    //       window.location.href = '/login';
    //     }
    //   } else {
    //     // No refresh token, redirect to login
    //     window.location.href = '/login';
    //   }
    // }

    // // Handle 403 Forbidden
    // if (error.response?.status === 403) {
    //   // Handle forbidden access
    //   console.error('Forbidden access:', error);
    // }

    // // Handle 404 Not Found
    // if (error.response?.status === 404) {
    //   console.error('Resource not found:', error);
    // }

    // // Handle 500 Internal Server Error
    // if (error.response?.status === 500) {
    //   console.error('Server error:', error);
    // }
    return Promise.reject(error);
  },
);
