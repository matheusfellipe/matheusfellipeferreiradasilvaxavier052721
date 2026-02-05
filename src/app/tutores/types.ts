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
}

export interface TutorFormData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number;
}
