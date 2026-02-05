import { useParams, useNavigate } from 'react-router-dom';
import { PetForm } from '@/app/pets/components/PetForm';
import { Card, Title, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import type { PetFormData } from '@/app/pets/types';

const PetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);



  const handleSubmit = async (data: PetFormData) => {
  
        console.log('Form data submitted:', data);

      showNotification({
        title: 'Sucesso',
        message: isEditMode ? 'Pet atualizado com sucesso!' : 'Pet cadastrado com sucesso!',
        color: 'green',
      });

      navigate('/home');
   
  };

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
              mode={isEditMode ? 'edit' : 'create'}
              onSubmit={handleSubmit}
            
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PetPage;
