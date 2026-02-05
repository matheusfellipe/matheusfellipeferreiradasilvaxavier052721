import { apiClient } from '@/shared/http/api';
import type { Tutor } from './types';

export interface TutorListResponse {
  content: Tutor[];
  page: number;
  size: number;
  total: number;
  pageCount: number;
}

export interface TutorListParams {
  page?: number;
  size?: number;
  nome?: string;
}

export class TutorService {
  private basePath = '/v1/tutores';

  async listTutores(params: TutorListParams = {}): Promise<TutorListResponse> {
    const { page = 0, size = 10, nome } = params;
    
    const response = await apiClient.get<TutorListResponse>(this.basePath, {
      params: {
        page,
        size,
        ...(nome && { nome }),
      },
    });

    return response.data;
  }

  async getTutorById(id: string): Promise<Tutor> {
    const response = await apiClient.get<Tutor>(`${this.basePath}/${id}`);
    return response.data;
  }

  async createTutor(tutor: Omit<Tutor, 'id'>): Promise<Tutor> {
    const response = await apiClient.post<Tutor>(this.basePath, tutor);
    return response.data;
  }

  async updateTutor(id: string, tutor: Partial<Tutor>): Promise<Tutor> {
    const response = await apiClient.put<Tutor>(`${this.basePath}/${id}`, tutor);
    return response.data;
  }

  async deleteTutor(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  async uploadTutorPhoto(tutorId: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('foto', file);
    
    await apiClient.post(`${this.basePath}/${tutorId}/fotos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deleteTutorPhoto(tutorId: string, fotoId: number): Promise<void> {
    await apiClient.delete(`${this.basePath}/${tutorId}/fotos/${fotoId}`);
  }

  async assignPetToTutor(tutorId: string, petId: number): Promise<void> {
    await apiClient.post(`${this.basePath}/${tutorId}/pets/${petId}`);
  }

  async removePetFromTutor(tutorId: string, petId: number): Promise<void> {
    await apiClient.delete(`${this.basePath}/${tutorId}/pets/${petId}`);
  }
}

export const tutorService = new TutorService();
