import { Button, TextInput, Textarea, NumberInput, Select } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Pet } from '../types';

const petFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  especie: z.string().min(1, 'Espécie é obrigatória'),
  raca: z.string().optional(),
  idade: z.number().min(0, 'Idade deve ser maior ou igual a 0').max(50, 'Idade inválida'),
  descricao: z.string().optional(),
  tutor: z.string().optional(),
  localizacao: z.string().optional(),
});

type PetFormData = z.infer<typeof petFormSchema>;

interface PetFormProps {
  initialData?: Partial<Pet>;
  onSubmit: (data: PetFormData) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export const PetForm = ({ initialData, onSubmit, onCancel, isLoading = false, mode = 'create' }: PetFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      nome: initialData?.nome || '',
      especie: initialData?.especie || '',
      raca: initialData?.raca || '',
      idade: initialData?.idade || 0,
      descricao: initialData?.descricao || '',
      tutor: initialData?.tutor || '',
      localizacao: initialData?.localizacao || '',
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
          {...register('nome')}
          error={errors.nome?.message}
          required
          size="md"
        />

        <Controller
          name="especie"
          control={control}
          render={({ field }) => (
            <Select
              label="Espécie"
              placeholder="Selecione a espécie"
              data={speciesOptions}
              {...field}
              error={errors.especie?.message}
              required
              size="md"
            />
          )}
        />

        <TextInput
          label="Raça"
          placeholder="Ex: Golden Retriever, Siamês..."
          {...register('raca')}
          error={errors.raca?.message}
          size="md"
        />

        <Controller
          name="idade"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Idade"
              placeholder="Idade em anos"
              min={0}
              max={50}
              {...field}
              error={errors.idade?.message}
              required
              size="md"
            />
          )}
        />

        <TextInput
          label="Nome do Tutor"
          placeholder="Nome do tutor responsável"
          {...register('tutor')}
          error={errors.tutor?.message}
          size="md"
        />

        <TextInput
          label="Localização"
          placeholder="Ex: São Paulo, SP"
          {...register('localizacao')}
          error={errors.localizacao?.message}
          size="md"
        />
      </div>

      <Textarea
        label="Descrição"
        placeholder="Descreva o pet, suas características e personalidade..."
        {...register('descricao')}
        error={errors.descricao?.message}
        minRows={4}
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
          onClick={onCancel}
          className="flex-1 md:flex-none md:min-w-[200px]"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
