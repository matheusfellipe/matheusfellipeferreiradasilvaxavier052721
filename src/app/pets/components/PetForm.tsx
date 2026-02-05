import { Button, TextInput, NumberInput } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
      raca: initialData?.raca || '',
      idade: initialData?.idade || 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
