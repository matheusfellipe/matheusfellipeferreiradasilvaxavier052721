import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Image, Text, Badge, Group, Button, Loader, Alert, Stack, Avatar, Title } from '@mantine/core';
import { IconArrowLeft, IconEdit } from '@tabler/icons-react';
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
            onClick={() => navigate(-1)}
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
                    <Group gap="xs" className="mb-2">
                        <Title order={2}>{pet.nome}</Title>
                        <Badge color="blue" variant="light">
                            Pet
                        </Badge>
                    </Group>
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

                        {pet.tutores && pet.tutores.length > 0 && (
                        <div>
                            <Text size="sm" fw={600} className="mb-2">
                            {pet.tutores.length === 1 ? 'Tutor' : 'Tutores'}
                            </Text>

                        <div className="space-y-2">
                        {pet.tutores.map((tutor) => (
                            <Card key={tutor.id} padding="sm" radius="sm" withBorder>
                            <Group gap="sm" align="center" wrap="nowrap">
                                <Avatar
                                src={tutor.foto?.url}
                                alt={tutor.nome}
                                size="md"      
                                radius="xl"   
                                >
                                {tutor.nome.charAt(0)}
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                <Text size="sm" fw={600} truncate>
                                    {tutor.nome}
                                </Text>

                                {tutor.email && (
                                    <Text size="xs" c="dimmed" truncate>
                                    {tutor.email}
                                    </Text>
                                )}

                                {tutor.telefone && (
                                    <Text size="xs" c="dimmed">
                                    {tutor.telefone}
                                    </Text>
                                )}
                                {tutor.endereco && (
                                    <Text size="xs" c="dimmed" truncate>
                                    📍 {tutor.endereco}
                                    </Text>
                                )}
                                </div>
                            </Group>
                            </Card>
                        ))}
                        </div>
                    </div>
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
