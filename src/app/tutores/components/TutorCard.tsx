import { Card, Text, Group, Image, Button, Avatar } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconEdit, IconEye } from '@tabler/icons-react';
import type { Tutor } from '../types';

interface TutorCardProps {
  tutor: Tutor;
  onClick?: (tutor: Tutor) => void;
  onEdit?: (tutor: Tutor) => void;
  onViewDetails?: (tutor: Tutor) => void;
}

export const TutorCard = ({ tutor, onEdit, onViewDetails }: TutorCardProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      className="hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <Card.Section className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
        {tutor.foto?.url ? (
          <Image
            src={tutor.foto.url}
            h="100%"
            w="100%"
            fit="cover"
            alt={tutor.nome}
          />
        ) : (
          <Avatar
            size={120}
            radius="xl"
            color="green"
            className="text-4xl"
          >
            {tutor.nome.substring(0, 2).toUpperCase()}
          </Avatar>
        )}
      </Card.Section>

      <div className="mt-4 space-y-3 flex-1 flex flex-col">
        <div>
          <Text fw={600} size="lg">
            {tutor.nome}
          </Text>
          {tutor.cpf && (
            <Text size="xs" c="dimmed" className="font-mono">
              CPF: {tutor.cpf.toString().padStart(11, '0').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
            </Text>
          )}
        </div>

        <div className="space-y-2">
          {tutor.email && (
            <Group gap={6}>
              <IconMail size={14} className="text-gray-500" />
              <Text size="sm" c="dimmed" lineClamp={1}>
                {tutor.email}
              </Text>
            </Group>
          )}
          
          {tutor.telefone && (
            <Group gap={6}>
              <IconPhone size={14} className="text-gray-500" />
              <Text size="sm" c="dimmed">
                {tutor.telefone}
              </Text>
            </Group>
          )}
          
          {tutor.endereco && (
            <Group gap={6}>
              <IconMapPin size={14} className="text-gray-500" />
              <Text size="sm" c="dimmed" lineClamp={2}>
                {tutor.endereco}
              </Text>
            </Group>
          )}
        </div>

        <div className="flex-1" />

        <Group gap="sm" className="mt-3">
          <Button
            variant="light"
            color="blue"
            size="sm"
            leftSection={<IconEye size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(tutor);
            }}
            className="flex-1"
          >
            Detalhes
          </Button>
          <Button
            variant="light"
            color="green"
            size="sm"
            leftSection={<IconEdit size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(tutor);
            }}
            className="flex-1"
          >
            Editar
          </Button>
        </Group>
      </div>
    </Card>
  );
};
