import type { Pet } from '../pets/types';

export interface TutorPhoto {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface Tutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number;
  foto?: TutorPhoto;
  pets?: Pet[];
}

export interface TutorFormData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
}
