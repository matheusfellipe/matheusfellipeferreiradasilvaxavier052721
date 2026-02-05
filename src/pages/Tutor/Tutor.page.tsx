import { useParams, useNavigate } from 'react-router-dom';
import { TutorForm } from '@/app/tutores/components/TutorForm';
import { Card, Title, Text, Loader, Alert, Container } from '@mantine/core';
import type { TutorFormData } from '@/app/tutores/types';
import { useTutor, useCreateTutor, useUpdateTutor, useUploadTutorPhoto, useDeleteTutorPhoto } from '@/app/tutores/useTutores';
import { useState } from 'react';

const TutorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);

  const { data: tutor, isLoading, error } = useTutor(id);
  const createTutorMutation = useCreateTutor();
  const updateTutorMutation = useUpdateTutor();
  const uploadPhotoMutation = useUploadTutorPhoto();
  const deletePhotoMutation = useDeleteTutorPhoto();

  const handleSubmit = async (data: TutorFormData) => {
    try {
     
      const cpfNumber = Number(data.cpf.replace(/\D/g, ''));
      const tutorData = { ...data, cpf: cpfNumber };
      
      if (isEditMode && id) {
        await updateTutorMutation.mutateAsync({ id, data: tutorData });
        navigate(-1);
      } else {
        
        const newTutor = await createTutorMutation.mutateAsync(tutorData);
        
       
        if (pendingPhoto && newTutor.id) {
          await uploadPhotoMutation.mutateAsync({ 
            tutorId: String(newTutor.id), 
            file: pendingPhoto 
          });
        }
        navigate('/tutores');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    if (isEditMode && id) {
      await uploadPhotoMutation.mutateAsync({ tutorId: id, file });
    } else {
      
      setPendingPhoto(file);
    }
  };

  const handlePhotoDelete = async (fotoId: number) => {
    if (id) {
      await deletePhotoMutation.mutateAsync({ tutorId: id, fotoId });
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
          Não foi possível carregar os dados do tutor.
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
                {isEditMode ? 'Editar Tutor' : 'Cadastrar Novo Tutor'}
              </Title>
              <Text c="dimmed" size="sm">
                {isEditMode 
                  ? 'Atualize as informações do tutor abaixo' 
                  : 'Preencha as informações do tutor para cadastrá-lo'}
              </Text>
            </div>

            <TutorForm
              initialData={isEditMode ? tutor : undefined}
              mode={isEditMode ? 'edit' : 'create'}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={createTutorMutation.isPending || updateTutorMutation.isPending}
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

export default TutorPage;
