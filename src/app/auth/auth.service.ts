import apiClient from "@/shared/http/api";
import type { AuthResponse, LoginType } from "./types";
import Cookies from 'js-cookie'

export default class AuthService  {


    constructor(){
  
    }
  
      async login({username, password}:LoginType): Promise<AuthResponse>{
        const response = await  apiClient.post(`/autenticacao/login` , {username, password});
  
        return response.data;
      }


      async refreshLogin(refresh_token : string): Promise<AuthResponse>{
        const response = await  apiClient.post(`/autenticacao/refresh`, {refreshToken:refresh_token});
  
        return response.data;
      }
  
    
      
      async logout(): Promise<void>{
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('expires_in');
        Cookies.remove('token_type');
       
      }
  }