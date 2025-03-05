import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase';
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
  async (config: InternalAxiosRequestConfig) => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting token:', error);
      }
    }
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
    const auth = getAuth(firebaseApp);

    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        // Get a new access token using Firebase refresh mechanism
        const newToken = await user.getIdToken(true); // Forces token refresh
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axios(originalRequest); // Retry original request with new token
      } catch (refreshError) {
        console.error('Token refresh failed. Logging out...');
        await signOut(auth);
        window.location.href = '/auth/login'; // Redirect to login
      }
    }
    // Handle other error scenarios
    switch (error.response?.status) {
      case 403:
        console.error('Forbidden access:', error);
        break;
      case 404:
        console.error('Resource not found:', error);
        break;
      case 500:
        console.error('Server error:', error);
        break;
    }

    return Promise.reject(error);
  },
);
