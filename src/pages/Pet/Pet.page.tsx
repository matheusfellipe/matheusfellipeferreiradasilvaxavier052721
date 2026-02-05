import { useParams, useNavigate } from 'react-router-dom';
import { PetForm } from '@/app/pets/components/PetForm';
import { Card, Title, Text, Loader, Alert, Container } from '@mantine/core';
import type { PetFormData } from '@/app/pets/types';
import { usePet, useCreatePet, useUpdatePet, useUploadPetPhoto, useDeletePetPhoto } from '@/app/pets/usePets';

const PetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { data: pet, isLoading, error } = usePet(id);
  const createPetMutation = useCreatePet();
  const updatePetMutation = useUpdatePet();
  const uploadPhotoMutation = useUploadPetPhoto();
  const deletePhotoMutation = useDeletePetPhoto();

  const handleSubmit = async (data: PetFormData) => {
    try {
      if (isEditMode && id) {
        await updatePetMutation.mutateAsync({ id, data });
      } else {
        await createPetMutation.mutateAsync(data);
      }
      navigate(-1);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    if (id) {
      await uploadPhotoMutation.mutateAsync({ petId: id, file });
    }
  };

  const handlePhotoDelete = async (fotoId: number) => {
    if (id) {
      await deletePhotoMutation.mutateAsync({ petId: id, fotoId });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && isLoading) {
    return (
      <Container size="md" className="py-8">
        <div className="flex justify-center items-center py-12">
          <Loader size="lg" color="green" />
        </div>
      </Container>
    );
  }

  if (isEditMode && error) {
    return (
      <Container size="md" className="py-8">
        <Alert color="red" title="Erro">
          Não foi possível carregar os dados do pet.
        </Alert>
      </Container>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Card shadow="sm" padding="xl" radius="md" className="bg-white">
          <div className="space-y-6">
            <div>
              <Title order={2} className="text-2xl md:text-3xl font-bold mb-2">
                {isEditMode ? 'Editar Pet' : 'Cadastrar Novo Pet'}
              </Title>
              <Text c="dimmed" size="sm">
                {isEditMode 
                  ? 'Atualize as informações do pet abaixo' 
                  : 'Preencha as informações do pet para cadastrá-lo'}
              </Text>
            </div>

            <PetForm
              initialData={isEditMode ? pet : undefined}
              mode={isEditMode ? 'edit' : 'create'}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={createPetMutation.isPending || updatePetMutation.isPending}
              onPhotoUpload={handlePhotoUpload}
              onPhotoDelete={handlePhotoDelete}
              isUploadingPhoto={uploadPhotoMutation.isPending || deletePhotoMutation.isPending}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PetPage;
