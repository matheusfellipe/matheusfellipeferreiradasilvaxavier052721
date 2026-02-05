// src/shared/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { showNotification } from '@mantine/notifications';

import type { LoginType } from './types';
import AuthService from './auth.service';


const authService = new AuthService();

export const useAuth = () => {

  const navigate = useNavigate();


  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: LoginType) => {
      const response = await authService.login({ username, password });

      
      Cookies.set('access_token', response.access_token);
      Cookies.set('refresh_token', response.refresh_token);
      Cookies.set('expires_in', response.expires_in.toString());
    },
    onSuccess: () => {
    
     
      showNotification({
        title: 'Success',
        message: 'Autenticação bem-sucedida!',
        autoClose: 4000,
      });

      navigate('/home');
    },
    onError: () => {
      showNotification({
        title: 'Error',
        message: `Autenticação falhou! Por favor, verifique suas credenciais e tente novamente.`,
        autoClose: 4000,
      });
    },
  });

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('expires_in');
    Cookies.remove('token_type');
   
    navigate('/authentication/login');
  };

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout,
  };
};
