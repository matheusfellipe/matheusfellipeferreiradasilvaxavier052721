import { apiClient } from '@/shared/http/api';
import type { Pet } from './types';

export interface PetListResponse {
  content: Pet[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page number
}

export interface PetListParams {
  page?: number;
  size?: number;
  search?: string;
}

export class PetService {
  private basePath = '/v1/pets';

  async listPets(params: PetListParams = {}): Promise<PetListResponse> {
    const { page = 0, size = 10, search } = params;
    
    const response = await apiClient.get<PetListResponse>(this.basePath, {
      params: {
        page,
        size,
        ...(search && { search }),
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
}

export const petService = new PetService();
