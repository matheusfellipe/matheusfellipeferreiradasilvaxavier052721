import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { petService, type PetListParams } from './pet.service';
import type { Pet } from './types';
import { showNotification } from '@mantine/notifications';

const PETS_QUERY_KEY = 'pets';

export const usePets = (params: PetListParams = {}) => {
  return useQuery({
    queryKey: [PETS_QUERY_KEY, params],
    queryFn: () => petService.listPets(params),
  });
};

export const usePet = (id: string | undefined) => {
  return useQuery({
    queryKey: [PETS_QUERY_KEY, id],
    queryFn: () => petService.getPetById(id!),
    enabled: !!id,
  });
};

export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pet: Omit<Pet, 'id'>) => petService.createPet(pet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PETS_QUERY_KEY] });
      showNotification({
        title: 'Sucesso',
        message: 'Pet cadastrado com sucesso!',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Erro',
        message: 'Falha ao cadastrar o pet. Tente novamente.',
        color: 'red',
      });
    },
  });
};

export const useUpdatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Pet> }) =>
      petService.updatePet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PETS_QUERY_KEY] });
      showNotification({
        title: 'Sucesso',
        message: 'Pet atualizado com sucesso!',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Erro',
        message: 'Falha ao atualizar o pet. Tente novamente.',
        color: 'red',
      });
    },
  });
};

export const useDeletePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => petService.deletePet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PETS_QUERY_KEY] });
      showNotification({
        title: 'Sucesso',
        message: 'Pet removido com sucesso!',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Erro',
        message: 'Falha ao remover o pet. Tente novamente.',
        color: 'red',
      });
    },
  });
};
