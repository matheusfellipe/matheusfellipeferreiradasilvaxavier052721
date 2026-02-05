import { Card, Text, Badge, Group, Image } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import type { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onClick?: (pet: Pet) => void;
}

export const PetCard = ({ pet, onClick }: PetCardProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(pet)}
    >
      <Card.Section>
        <Image
          src={pet.imageUrl}
          height={200}
          alt={pet.name}
          className="object-cover"
        />
      </Card.Section>

      <div className="mt-4 space-y-3">
        <Group justify="space-between" align="flex-start">
          <div>
            <Text fw={600} size="lg">
              {pet.name}
            </Text>
            <Text size="sm" c="dimmed">
              {pet.breed || pet.species}
            </Text>
          </div>
          <Badge color="green" variant="light">
            {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
          </Badge>
        </Group>

        {pet.description && (
          <Text size="sm" c="dimmed" lineClamp={2}>
            {pet.description}
          </Text>
        )}

        <Group gap="xs">
          {pet.location && (
            <Group gap={4}>
              <IconMapPin size={14} className="text-gray-500" />
              <Text size="xs" c="dimmed">
                {pet.location}
              </Text>
            </Group>
          )}
          {pet.tutorName && (
            <Text size="xs" c="dimmed">
              • Tutor: {pet.tutorName}
            </Text>
          )}
        </Group>
      </div>
    </Card>
  );
};
