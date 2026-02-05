import { SimpleGrid, Text } from '@mantine/core';
import type { Pet } from '../types';
import { PetCard } from './PetCard';

interface PetGridProps {
  pets: Pet[];
  onPetClick?: (pet: Pet) => void;
}

export const PetGrid = ({ pets, onPetClick }: PetGridProps) => {
  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <Text size="lg" c="dimmed">
          Nenhum pet encontrado
        </Text>
      </div>
    );
  }

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
      spacing={{ base: 'md', sm: 'lg' }}
    >
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onClick={onPetClick} />
      ))}
    </SimpleGrid>
  );
};
