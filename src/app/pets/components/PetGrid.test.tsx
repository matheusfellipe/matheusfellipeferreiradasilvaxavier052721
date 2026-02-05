import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { PetGrid } from './PetGrid';
import type { Pet } from '../types';

const mockPets: Pet[] = [
  {
    id: 1,
    nome: 'Rex',
    raca: 'Golden Retriever',
    especie: 'Cachorro',
    idade: 3,
    foto: {
      id: 1,
      nome: 'rex.jpg',
      contentType: 'image/jpeg',
      url: 'https://example.com/rex.jpg',
    },
  },
  {
    id: 2,
    nome: 'Luna',
    raca: 'Siamês',
    especie: 'Gato',
    idade: 2,
    foto: {
      id: 2,
      nome: 'luna.jpg',
      contentType: 'image/jpeg',
      url: 'https://example.com/luna.jpg',
    },
  },
];

describe('PetGrid', () => {
  it('should render all pets in a grid', () => {
    renderWithProviders(<PetGrid pets={mockPets} />);

    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.getByText('Luna')).toBeInTheDocument();
  });

  it('should call onPetClick when a pet card is clicked', async () => {
    const user = userEvent.setup();
    const handlePetClick = vi.fn();
    renderWithProviders(<PetGrid pets={mockPets} onPetClick={handlePetClick} />);

    const rexCard = screen.getByText('Rex').closest('.mantine-Card-root');
    if (rexCard) {
      await user.click(rexCard);
      expect(handlePetClick).toHaveBeenCalledWith(mockPets[0]);
    }
  });
});
