import { Button, TextInput, Textarea, NumberInput, Select } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Pet } from '../types';

const petFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  species: z.string().min(1, 'Espécie é obrigatória'),
  breed: z.string().optional(),
  age: z.number().min(0, 'Idade deve ser maior ou igual a 0').max(50, 'Idade inválida'),
  description: z.string().optional(),
  tutorName: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
});

type PetFormData = z.infer<typeof petFormSchema>;

interface PetFormProps {
  initialData?: Partial<Pet>;
  onSubmit: (data: PetFormData) => void | Promise<void>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export const PetForm = ({ initialData, onSubmit, isLoading = false, mode = 'create' }: PetFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      species: initialData?.species || '',
      breed: initialData?.breed || '',
      age: initialData?.age || 0,
      description: initialData?.description || '',
      tutorName: initialData?.tutorName || '',
      location: initialData?.location || '',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  const speciesOptions = [
    { value: 'Cachorro', label: 'Cachorro' },
    { value: 'Gato', label: 'Gato' },
    { value: 'Pássaro', label: 'Pássaro' },
    { value: 'Coelho', label: 'Coelho' },
    { value: 'Outro', label: 'Outro' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Nome do Pet"
          placeholder="Ex: Rex, Luna, Thor..."
          {...register('name')}
          error={errors.name?.message}
          required
          size="md"
        />

        <Controller
          name="species"
          control={control}
          render={({ field }) => (
            <Select
              label="Espécie"
              placeholder="Selecione a espécie"
              data={speciesOptions}
              {...field}
              error={errors.species?.message}
              required
              size="md"
            />
          )}
        />

        <TextInput
          label="Raça"
          placeholder="Ex: Golden Retriever, Siamês..."
          {...register('breed')}
          error={errors.breed?.message}
          size="md"
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Idade"
              placeholder="Idade em anos"
              min={0}
              max={50}
              {...field}
              error={errors.age?.message}
              required
              size="md"
            />
          )}
        />

        <TextInput
          label="Nome do Tutor"
          placeholder="Nome do tutor responsável"
          {...register('tutorName')}
          error={errors.tutorName?.message}
          size="md"
        />

        <TextInput
          label="Localização"
          placeholder="Ex: São Paulo, SP"
          {...register('location')}
          error={errors.location?.message}
          size="md"
        />
      </div>

      <Textarea
        label="Descrição"
        placeholder="Descreva o pet, suas características e personalidade..."
        {...register('description')}
        error={errors.description?.message}
        minRows={4}
        size="md"
      />

      <TextInput
        label="URL da Imagem"
        placeholder="https://exemplo.com/imagem.jpg"
        {...register('imageUrl')}
        error={errors.imageUrl?.message}
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
          {mode === 'create' ? 'Cadastrar Pet' : 'Salvar Alterações'}
        </Button>
        <Button
          type="button"
          variant="outline"
          color="gray"
          size="md"
          disabled={isLoading}
          className="flex-1 md:flex-none md:min-w-[200px]"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
