import { Button, TextInput, NumberInput, FileInput, Image, ActionIcon, Text } from '@mantine/core';
import { IconUpload, IconTrash } from '@tabler/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import type { Pet } from '../types';

const petFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  raca: z.string().min(1, 'Raça é obrigatória'),
  idade: z.number().min(0, 'Idade deve ser maior ou igual a 0').max(50, 'Idade inválida'),
});

type PetFormData = z.infer<typeof petFormSchema>;

interface PetFormProps {
  initialData?: Partial<Pet>;
  onSubmit: (data: PetFormData) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
  onPhotoUpload?: (file: File) => void | Promise<void>;
  onPhotoDelete?: (fotoId: number) => void | Promise<void>;
  isUploadingPhoto?: boolean;
}

export const PetForm = ({ initialData, onSubmit, onCancel, isLoading = false, mode = 'create', onPhotoUpload, onPhotoDelete, isUploadingPhoto = false }: PetFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      nome: initialData?.nome || '',
      raca: initialData?.raca || '',
      idade: initialData?.idade || 0,
    },
  });

  const handleFileChange = async (file: File | null) => {
    if (file) {
      setSelectedFile(file);
    
      if (mode === 'edit' && onPhotoUpload) {
        await onPhotoUpload(file);
        setSelectedFile(null);
      } else if (mode === 'create' && onPhotoUpload) {
        await onPhotoUpload(file);
      }
    }
  };

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
  };

  const handleDeletePhoto = async () => {
    if (initialData?.foto?.id && onPhotoDelete) {
      await onPhotoDelete(initialData.foto.id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="space-y-4">
        <Text size="sm" fw={500}>Foto do Pet</Text>
        
        {mode === 'edit' && initialData?.foto ? (
            <div className="space-y-4">
              <div className="relative w-[180px] h-[120px] bg-gray-50 rounded-md overflow-hidden">
                <Image
                  src={initialData.foto.url}
                  alt={initialData.nome || 'Pet'}
                  h="100%"
                  w="100%"
                  fit="contain"
                  radius="md"
                />
                <ActionIcon
                  color="red"
                  variant="filled"
                  size="lg"
                  radius="xl"
                  className="absolute top-2 right-2"
                  onClick={handleDeletePhoto}
                  loading={isUploadingPhoto}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </div>
              <Text size="xs" c="dimmed">Clique no ícone da lixeira para remover a foto atual</Text>
            </div>
          ) : selectedFile ? (
            <div className="space-y-4">
              <div className="relative w-[180px] h-[120px] bg-gray-50 rounded-md overflow-hidden">
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Pré-visualização"
                  h="100%"
                  w="100%"
                  fit="contain"
                  radius="md"
                />
                <ActionIcon
                  color="red"
                  variant="filled"
                  size="lg"
                  radius="xl"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveSelectedFile}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </div>
              <Text size="xs" c="dimmed">
                {mode === 'create' 
                  ? 'A foto será enviada após o cadastro do pet'
                  : 'Clique no ícone da lixeira para remover'}
              </Text>
            </div>
          ) : (
            <div className="space-y-2">
              <FileInput
                placeholder="Selecione uma imagem"
                leftSection={<IconUpload size={18} />}
                accept="image/*"
                value={selectedFile}
                onChange={handleFileChange}
                disabled={isUploadingPhoto}
                size="md"
              />
              <Text size="xs" c="dimmed">
                {mode === 'create' 
                  ? 'A foto será enviada após o cadastro do pet'
                  : 'Formatos aceitos: JPG, PNG, GIF'}
              </Text>
            </div>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TextInput
          label="Nome do Pet"
          placeholder="Ex: Rex, Luna, Thor..."
          {...register('nome')}
          error={errors.nome?.message}
          required
          size="md"
        />

        <TextInput
          label="Raça"
          placeholder="Ex: Golden Retriever, Siamês..."
          {...register('raca')}
          error={errors.raca?.message}
          required
          size="md"
        />

        <Controller
          name="idade"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Idade"
              placeholder="Ex: 05"
              min={0}
              max={50}
              step={1}
              stepHoldDelay={500}
              stepHoldInterval={100}
              {...field}
              error={errors.idade?.message}
              required
              size="md"
            />
          )}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          color="green"
          size="md"
          loading={isLoading}
          className="flex-1 md:flex-none md:min-w-[200px]"
        >
          {mode === 'create' ? 'Cadastrar Pet' : 'Salvar Alterações'}
        </Button>
        <Button
          type="button"
          variant="outline"
          color="gray"
          size="md"
          disabled={isLoading}
          onClick={onCancel}
          className="flex-1 md:flex-none md:min-w-[200px]"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
