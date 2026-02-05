import { apiClient } from '@/shared/http/api';
import type { Pet } from './types';

export interface PetListResponse {
  content: Pet[];
  page: number;
  size: number;
  total: number;
  pageCount: number;
}


export interface PetListParams {
  page?: number;
  size?: number;
  nome?: string;
  raca?: string;
}

export class PetService {
  private basePath = '/v1/pets';

  async listPets(params: PetListParams = {}): Promise<PetListResponse> {
    const { page = 0, size = 10, nome, raca } = params;
    
    const response = await apiClient.get<PetListResponse>(this.basePath, {
      params: {
        page,
        size,
        ...(nome && { nome }),
        ...(raca && { raca }),
      },
    });

    return response.data;
  }

  async getPetById(id: string): Promise<Pet> {
    const response = await apiClient.get<Pet>(`${this.basePath}/${id}`);
    return response.data;
  }

  async createPet(pet: Omit<Pet, 'id'>): Promise<Pet> {
    const response = await apiClient.post<Pet>(this.basePath, pet);
    return response.data;
  }

  async updatePet(id: string, pet: Partial<Pet>): Promise<Pet> {
    const response = await apiClient.put<Pet>(`${this.basePath}/${id}`, pet);
    return response.data;
  }

  async deletePet(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  async uploadPetPhoto(petId: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('foto', file);
    
    await apiClient.post(`${this.basePath}/${petId}/fotos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deletePetPhoto(petId: string, fotoId: number): Promise<void> {
    await apiClient.delete(`${this.basePath}/${petId}/fotos/${fotoId}`);
  }
}

export const petService = new PetService();
