import { Card, Text, Badge, Group, Image, Button } from '@mantine/core';
import { IconMapPin, IconEdit, IconEye } from '@tabler/icons-react';
import type { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onClick?: (pet: Pet) => void;
  onEdit?: (pet: Pet) => void;
  onViewDetails?: (pet: Pet) => void;
}

export const PetCard = ({ pet, onClick, onEdit, onViewDetails }: PetCardProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      className="hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
      onClick={() => onClick?.(pet)}
    >
      <Card.Section className="h-48 overflow-hidden bg-gray-50">
        <Image
          src={pet.foto?.url}
          h="100%"
          w="100%"
          fit="contain"
          alt={pet.nome}
        />
      </Card.Section>

      <div className="mt-4 space-y-3 flex-1 flex flex-col">
        <Group justify="space-between" align="flex-start">
          <div>
            <Text fw={600} size="lg">
              {pet.nome}
            </Text>
            <Text size="sm" c="dimmed">
              {pet.raca || pet.especie}
            </Text>
          </div>
          <Badge color="green" variant="light">
            {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
          </Badge>
        </Group>

        {pet.descricao && (
          <Text size="sm" c="dimmed" lineClamp={2}>
            {pet.descricao}
          </Text>
        )}

        <div className="flex-1" />

        <Group gap="xs" className="pt-2">
          {pet.localizacao && (
            <Group gap={4}>
              <IconMapPin size={14} className="text-gray-500" />
              <Text size="xs" c="dimmed">
                {pet.localizacao}
              </Text>
            </Group>
          )}
          {pet.tutor && (
            <Text size="xs" c="dimmed">
              • Tutor: {pet.tutor}
            </Text>
          )}
        </Group>

        <Group gap="sm" className="mt-3">
          <Button
            variant="light"
            color="blue"
            size="sm"
            leftSection={<IconEye size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(pet);
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
              onEdit?.(pet);
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
