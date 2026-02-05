import { Button, TextInput, NumberInput, FileInput, Image, ActionIcon, Text, Textarea } from '@mantine/core';
import { IconUpload, IconTrash } from '@tabler/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import type { Tutor } from '../types';

const tutorFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  cpf: z.number().min(10000000000, 'CPF deve ter 11 dígitos').max(99999999999, 'CPF deve ter 11 dígitos'),
});

type TutorFormData = z.infer<typeof tutorFormSchema>;

interface TutorFormProps {
  initialData?: Partial<Tutor>;
  onSubmit: (data: TutorFormData) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
  onPhotoUpload?: (file: File) => void | Promise<void>;
  onPhotoDelete?: (fotoId: number) => void | Promise<void>;
  isUploadingPhoto?: boolean;
}

export const TutorForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false, 
  mode = 'create', 
  onPhotoUpload, 
  onPhotoDelete, 
  isUploadingPhoto = false 
}: TutorFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TutorFormData>({
    resolver: zodResolver(tutorFormSchema),
    defaultValues: {
      nome: initialData?.nome || '',
      email: initialData?.email || '',
      telefone: initialData?.telefone || '',
      endereco: initialData?.endereco || '',
      cpf: initialData?.cpf || 0,
    },
  });

  const handleFileChange = async (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      // In edit mode, upload immediately. In create mode, just store for later
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
      {/* Photo Section */}
      <div className="space-y-4">
        <Text size="sm" fw={500}>Foto do Tutor</Text>
        
        {mode === 'edit' && initialData?.foto ? (
          <div className="space-y-4">
            <div className="relative inline-block w-[180px]">
              <Image
                src={initialData.foto.url}
                alt={initialData.nome || 'Tutor'}
                h={120}
                w={180}
                fit="cover"
                radius="md"
                className="bg-gray-50"
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
            <div className="relative inline-block w-[180px]">
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Pré-visualização"
                h={120}
                w={180}
                fit="cover"
                radius="md"
                className="bg-gray-50"
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
                ? 'A foto será enviada após o cadastro do tutor'
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
                ? 'A foto será enviada após o cadastro do tutor'
                : 'Formatos aceitos: JPG, PNG, GIF'}
            </Text>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Nome Completo"
          placeholder="Ex: João Silva Santos"
          {...register('nome')}
          error={errors.nome?.message}
          required
          size="md"
        />

        <TextInput
          label="Email"
          placeholder="Ex: joao.silva@email.com"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          required
          size="md"
        />

        <TextInput
          label="Telefone"
          placeholder="Ex: (11) 98765-4321"
          {...register('telefone')}
          error={errors.telefone?.message}
          required
          size="md"
        />

        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="CPF"
              placeholder="Ex: 12345678901"
              hideControls
              {...field}
              error={errors.cpf?.message}
              required
              size="md"
            />
          )}
        />
      </div>

      <Textarea
        label="Endereço"
        placeholder="Ex: Rua das Flores, 123 - Centro - São Paulo/SP"
        {...register('endereco')}
        error={errors.endereco?.message}
        required
        minRows={2}
        size="md"
      />

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          color="green"
          size="md"
          loading={isLoading}
          className="flex-1 md:flex-none md:min-w-[200px]"
        >
          {mode === 'create' ? 'Cadastrar Tutor' : 'Salvar Alterações'}
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
