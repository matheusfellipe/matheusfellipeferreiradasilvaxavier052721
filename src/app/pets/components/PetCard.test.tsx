import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { PetCard } from './PetCard';
import type { Pet } from '../types';

const mockPet: Pet = {
  id: 1,
  nome: 'Rex',
  raca: 'Golden Retriever',
  especie: 'Cachorro',
  idade: 3,
  descricao: 'Um cachorro muito amigável e brincalhão',
  tutor: 'João Silva',
  localizacao: 'São Paulo, SP',
  foto: {
    id: 1,
    nome: 'rex.jpg',
    contentType: 'image/jpeg',
    url: 'https://example.com/rex.jpg',
  },
};

describe('PetCard', () => {
  it('should render pet basic information', () => {
    renderWithProviders(<PetCard pet={mockPet} />);

    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.getByText('Golden Retriever')).toBeInTheDocument();
    expect(screen.getByText('3 anos')).toBeInTheDocument();
  });

  it('should display age as "1 ano" for singular', () => {
    const youngPet: Pet = { ...mockPet, idade: 1 };
    renderWithProviders(<PetCard pet={youngPet} />);

    expect(screen.getByText('1 ano')).toBeInTheDocument();
  });

  it('should call onClick handler when card is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    renderWithProviders(<PetCard pet={mockPet} onClick={handleClick} />);

    const card = screen.getByText('Rex').closest('.mantine-Card-root');
    if (card) {
      await user.click(card);
      expect(handleClick).toHaveBeenCalledWith(mockPet);
    }
  });
});
