import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Image, Text, Group, Button, Loader, Alert, Stack, Avatar, Title } from '@mantine/core';
import { IconArrowLeft, IconEdit, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { tutorService } from '@/app/tutores/tutor.service';

const TutorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: tutor, isLoading, error } = useQuery({
    queryKey: ['tutor', id],
    queryFn: () => tutorService.getTutorById(id!),
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
      </div>
    </Container>
  );
};

export default TutorDetailPage;
