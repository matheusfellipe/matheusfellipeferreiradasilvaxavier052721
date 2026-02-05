import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tutorService, type TutorListParams } from './tutor.service';
import type { Tutor } from './types';
import { showNotification } from '@mantine/notifications';

const TUTORES_QUERY_KEY = 'tutores';

export const useTutores = (params: TutorListParams = {}) => {
  return useQuery({
    queryKey: [TUTORES_QUERY_KEY, params],
    queryFn: () => tutorService.listTutores(params),
  });
};

export const useTutor = (id: string | undefined) => {
  return useQuery({
    queryKey: [TUTORES_QUERY_KEY, id],
    queryFn: () => tutorService.getTutorById(id!),
    enabled: !!id,
  });
};

export const useCreateTutor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tutor: Omit<Tutor, 'id'>) => tutorService.createTutor(tutor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TUTORES_QUERY_KEY] });
      showNotification({
        title: 'Sucesso',
        message: 'Tutor cadastrado com sucesso!',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Erro',
        message: 'Falha ao cadastrar o tutor. Tente novamente.',
        color: 'red',
      });
    },
  });
};

export const useUpdateTutor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Tutor> }) =>
      tutorService.updateTutor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TUTORES_QUERY_KEY] });
      showNotification({
        title: 'Sucesso',
        message: 'Tutor atualizado com sucesso!',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Erro',
        message: 'Falha ao atualizar o tutor. Tente novamente.',
        color: 'red',
      });
    },
  });
};

export const useDeleteTutor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tutorService.deleteTutor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TUTORES_QUERY_KEY] });
      showNotification({
        title: 'Sucesso',
        message: 'Tutor removido com sucesso!',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Erro',
        message: 'Falha ao remover o tutor. Tente novamente.',
        color: 'red',
      });
    },
  });
};

export const useUploadTutorPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tutorId, file }: { tutorId: string; file: File }) =>
      tutorService.uploadTutorPhoto(tutorId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [TUTORES_QUERY_KEY, variables.tutorId] });
      queryClient.invalidateQueries({ queryKey: [TUTORES_QUERY_KEY] });
      showNotification({
        title: 'Sucesso',
        message: 'Foto enviada com sucesso!',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Erro',
        message: 'Falha ao enviar a foto. Tente novamente.',
        color: 'red',
      });
    },
  });
};

export const useDeleteTutorPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tutorId, fotoId }: { tutorId: string; fotoId: number }) =>
      tutorService.deleteTutorPhoto(tutorId, fotoId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [TUTORES_QUERY_KEY, variables.tutorId] });
      queryClient.invalidateQueries({ queryKey: [TUTORES_QUERY_KEY] });
      showNotification({
        title: 'Sucesso',
        message: 'Foto removida com sucesso!',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Erro',
        message: 'Falha ao remover a foto. Tente novamente.',
        color: 'red',
      });
    },
  });
};
