import type { Tutor } from '../tutores/types';

export interface PetPhoto {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface Pet {
  id: number;
  nome: string;
  raca?: string;
  idade: number;
  foto?: PetPhoto;
  especie?: string;
  descricao?: string;
  tutor?: string; 
  localizacao?: string;
  tutores?: Tutor[]; 
}

export interface PetFormData {
  nome: string;
  especie: string;
  raca?: string;
  idade: number;
  descricao?: string;
  tutor?: string;
  localizacao?: string;
  foto?: File;
}
