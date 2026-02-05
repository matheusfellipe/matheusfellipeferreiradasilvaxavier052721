import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Image, Text, Badge, Group, Button, Loader, Alert, Stack } from '@mantine/core';
import { IconArrowLeft, IconEdit, IconMapPin, IconUser } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { petService } from '@/app/pets/pet.service';

const PetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: pet, isLoading, error } = useQuery({
    queryKey: ['pet', id],
    queryFn: () => petService.getPetById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container size="md" className="py-8">
        <div className="flex justify-center items-center py-12">
          <Loader size="lg" color="green" />
        </div>
      </Container>
    );
  }

  if (error || !pet) {
    return (
      <Container size="md" className="py-8">
        <Alert color="red" title="Erro">
          Não foi possível carregar os detalhes do pet.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="md" className="py-8">
      <div className="space-y-6">
       
        <Group justify="space-between">
          <Button
           color="black"
            variant="subtle"
            leftSection={<IconArrowLeft size={20} />}
            onClick={() => navigate('/home')}
          >
            Voltar
          </Button>
          <Button
            color="green"
            leftSection={<IconEdit size={20} />}
            onClick={() => navigate(`/pets/${id}/edit`)}
          >
            Editar Pet
          </Button>
        </Group>

        
        <Card shadow="md" padding="xl" radius="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div>
              <Image
                src={pet.foto?.url}
                alt={pet.nome}
                height={400}
                fit="contain"
                radius="md"
                className="bg-gray-50"
              />
            </div>

            
            <Stack gap="lg">
              <div>
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="xl" fw={700} className="mb-2">
                      {pet.nome}
                    </Text>
                    <Text size="md" c="dimmed">
                      {pet.raca || pet.especie}
                    </Text>
                  </div>
                  <Badge color="green" variant="light" size="lg">
                    {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
                  </Badge>
                </Group>
              </div>

              {pet.descricao && (
                <div>
                  <Text size="sm" fw={600} className="mb-2">
                    Descrição
                  </Text>
                  <Text size="sm" c="dimmed">
                    {pet.descricao}
                  </Text>
                </div>
              )}

              <div className="space-y-3">
                {pet.especie && (
                  <Group gap="xs">
                    <Text size="sm" fw={600}>
                      Espécie:
                    </Text>
                    <Text size="sm" c="dimmed">
                      {pet.especie}
                    </Text>
                  </Group>
                )}

                {pet.raca && (
                  <Group gap="xs">
                    <Text size="sm" fw={600}>
                      Raça:
                    </Text>
                    <Text size="sm" c="dimmed">
                      {pet.raca}
                    </Text>
                  </Group>
                )}

                {pet.tutor && (
                  <Group gap="xs">
                    <IconUser size={16} className="text-gray-500" />
                    <Text size="sm" fw={600}>
                      Tutor:
                    </Text>
                    <Text size="sm" c="dimmed">
                      {pet.tutor}
                    </Text>
                  </Group>
                )}

                {pet.localizacao && (
                  <Group gap="xs">
                    <IconMapPin size={16} className="text-gray-500" />
                    <Text size="sm" fw={600}>
                      Localização:
                    </Text>
                    <Text size="sm" c="dimmed">
                      {pet.localizacao}
                    </Text>
                  </Group>
                )}
              </div>
            </Stack>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default PetDetailPage;
