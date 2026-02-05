import axios, { type AxiosInstance } from 'axios';
import Cookies from 'js-cookie';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const storeTokens = (accessToken: string, refreshToken: string, expiresIn?: number) => {
  Cookies.set('access_token', accessToken, { expires: expiresIn ? expiresIn / 86400 : undefined }); // expiresIn in seconds
  Cookies.set('refresh_token', refreshToken);
};


export const clearTokens = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};


const redirectToLogin = () => {
  clearTokens();
  window.location.href = '/login';
};


export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});


apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get('refresh_token');
    const accessToken = Cookies.get('access_token');

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken &&
      accessToken
    ) {
      originalRequest._retry = true;

      try {
        console.log('Attempting token refresh with:', refreshToken);
        
        const response = await axios.put(
          `${API_BASE_URL}/autenticacao/refresh`,
          null,
          {
            headers: { Authorization: `Bearer ${refreshToken}`, Accept: 'application/json' },
            
          }
        );
        
        console.log('Refresh successful:', response.data);

        const { access_token: newAccessToken, refresh_token: newRefreshToken, expires_in } = response.data;

        
        clearTokens();
        storeTokens(newAccessToken, newRefreshToken, expires_in);

        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        redirectToLogin();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
