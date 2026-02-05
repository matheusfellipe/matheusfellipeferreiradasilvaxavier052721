import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Image, Text, Group, Button, Loader, Alert, Stack, Avatar, Title, Badge, SimpleGrid, Modal, ActionIcon } from '@mantine/core';
import { IconArrowLeft, IconEdit, IconMail, IconPhone, IconMapPin, IconPaw, IconPlus, IconTrash } from '@tabler/icons-react';
import { useTutor, useAssignPetToTutor, useRemovePetFromTutor } from '@/app/tutores/useTutores';
import { usePets } from '@/app/pets/usePets';
import { useState } from 'react';

const TutorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [removePetId, setRemovePetId] = useState<number | null>(null);

  const { data: tutor, isLoading, error } = useTutor(id);

  const { data: petsData } = usePets({ size: 100 });
  const assignPetMutation = useAssignPetToTutor();
  const removePetMutation = useRemovePetFromTutor();

  const availablePets = petsData?.content.filter(
    pet => !tutor?.pets?.some(tutorPet => tutorPet.id === pet.id)
  ) || [];

  const handleAssignPet = async (petId: number) => {
    if (id) {
      await assignPetMutation.mutateAsync({ tutorId: id, petId });
      setAssignModalOpen(false);
    }
  };

  const handleRemovePet = async () => {
    if (id && removePetId) {
      await removePetMutation.mutateAsync({ tutorId: id, petId: removePetId });
      setRemovePetId(null);
    }
  };

  if (isLoading) {
    return (
      <Container size="md" className="py-8">
        <div className="flex justify-center items-center py-12">
          <Loader size="lg" color="green" />
        </div>
      </Container>
    );
  }

  if (error || !tutor) {
    return (
      <Container size="md" className="py-8">
        <Alert color="red" title="Erro">
          Não foi possível carregar os detalhes do tutor.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="md" className="py-8">
      <div className="space-y-6">
        {/* Header */}
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
            onClick={() => navigate(`/tutores/${id}/edit`)}
          >
            Editar Tutor
          </Button>
        </Group>

        {/* Main Content */}
        <Card shadow="md" padding="xl" radius="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Photo Section */}
            <div className="flex justify-center items-start">
              {tutor.foto?.url ? (
                <Image
                  src={tutor.foto.url}
                  alt={tutor.nome}
                  height={400}
                  width={400}
                  fit="cover"
                  radius="md"
                  className="bg-gray-50"
                />
              ) : (
                <Avatar
                  size={300}
                  radius="md"
                  color="green"
                  className="text-8xl"
                >
                  {tutor.nome.substring(0, 2).toUpperCase()}
                </Avatar>
              )}
            </div>

            {/* Info Section */}
            <Stack gap="lg">
              <div>
                <Group gap="xs" className="mb-2">
                  <Title order={2}>{tutor.nome}</Title>
                </Group>
                {tutor.cpf && (
                  <Text size="sm" c="dimmed" className="font-mono">
                    CPF: {tutor.cpf.toString().padStart(11, '0').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                  </Text>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Text size="sm" fw={600} className="mb-3">
                  Informações de Contato
                </Text>

                {tutor.email && (
                  <Group gap="sm">
                    <IconMail size={20} className="text-gray-500" />
                    <div>
                      <Text size="xs" c="dimmed" fw={500}>
                        Email
                      </Text>
                      <Text size="sm">{tutor.email}</Text>
                    </div>
                  </Group>
                )}

                {tutor.telefone && (
                  <Group gap="sm">
                    <IconPhone size={20} className="text-gray-500" />
                    <div>
                      <Text size="xs" c="dimmed" fw={500}>
                        Telefone
                      </Text>
                      <Text size="sm">{tutor.telefone}</Text>
                    </div>
                  </Group>
                )}

                {tutor.endereco && (
                  <Group gap="sm" align="flex-start">
                    <IconMapPin size={20} className="text-gray-500 mt-1" />
                    <div>
                      <Text size="xs" c="dimmed" fw={500}>
                        Endereço
                      </Text>
                      <Text size="sm">{tutor.endereco}</Text>
                    </div>
                  </Group>
                )}
              </div>
            </Stack>
          </div>
        </Card>

        {/* Pets Section */}
        <Card shadow="md" padding="xl" radius="md">
          <div className="space-y-4">
            <Group justify="space-between">
              <Group gap="xs">
                <IconPaw size={24} className="text-green-600" />
                <Title order={3}>Pets do Tutor</Title>
                {tutor.pets && tutor.pets.length > 0 && (
                  <Badge color="green" variant="light" size="lg">
                    {tutor.pets.length}
                  </Badge>
                )}
              </Group>
              <Button
                leftSection={<IconPlus size={18} />}
                color="green"
                size="sm"
                onClick={() => setAssignModalOpen(true)}
              >
                Atribuir Pet
              </Button>
            </Group>

            {tutor.pets && tutor.pets.length > 0 ? (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                {tutor.pets.map((pet) => (
                  <Card
                    key={pet.id}
                    shadow="sm"
                    padding="md"
                    radius="md"
                    withBorder
                    className="hover:shadow-lg transition-shadow relative"
                  >
                    <ActionIcon
                      color="red"
                      variant="filled"
                      size="sm"
                      radius="xl"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => setRemovePetId(pet.id)}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                    <Card.Section 
                      className="h-32 overflow-hidden bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/pets/${pet.id}`)}
                    >
                      <Image
                        src={pet.foto?.url}
                        h="100%"
                        w="100%"
                        fit="contain"
                        alt={pet.nome}
                      />
                    </Card.Section>
                    <div className="mt-3">
                      <Text fw={600} size="md">
                        {pet.nome}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {pet.raca}
                      </Text>
                      <Badge color="green" variant="light" size="sm" className="mt-2">
                        {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </SimpleGrid>
            ) : (
              <Text c="dimmed" size="sm" className="text-center py-8">
                Nenhum pet atribuído a este tutor
              </Text>
            )}
          </div>
        </Card>

        {/* Assign Pet Modal */}
        <Modal
          opened={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          title="Atribuir Pet ao Tutor"
          size="lg"
        >
          {availablePets.length > 0 ? (
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {availablePets.map((pet) => (
                <Card
                  key={pet.id}
                  shadow="sm"
                  padding="md"
                  radius="md"
                  withBorder
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleAssignPet(pet.id)}
                >
                  <Card.Section className="h-24 overflow-hidden bg-gray-50">
                    <Image
                      src={pet.foto?.url}
                      h="100%"
                      w="100%"
                      fit="contain"
                      alt={pet.nome}
                    />
                  </Card.Section>
                  <div className="mt-3">
                    <Text fw={600} size="sm">
                      {pet.nome}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {pet.raca}
                    </Text>
                  </div>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Text c="dimmed" className="text-center py-8">
              Todos os pets já estão atribuídos a este tutor
            </Text>
          )}
        </Modal>

        {/* Remove Pet Confirmation Modal */}
        <Modal
          opened={removePetId !== null}
          onClose={() => setRemovePetId(null)}
          title="Remover Pet do Tutor"
          size="sm"
        >
          <Text size="sm" className="mb-4">
            Tem certeza que deseja remover este pet do tutor?
          </Text>
          <Group justify="flex-end" gap="sm">
            <Button
              variant="outline"
              color="gray"
              onClick={() => setRemovePetId(null)}
            >
              Cancelar
            </Button>
            <Button
              color="red"
              onClick={handleRemovePet}
              loading={removePetMutation.isPending}
            >
              Remover
            </Button>
          </Group>
        </Modal>
      </div>
    </Container>
  );
};

export default TutorDetailPage;
