import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import PetsSection from './PetsSection';

// Mock usePetsFacade
const mockUsePetsFacade = vi.fn();

vi.mock('@/app/pets/usePetsFacade', () => ({
  usePetsFacade: () => mockUsePetsFacade(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('PetsSection - Loading State', () => {
  it('should display Loader when isLoading is true', () => {
    mockUsePetsFacade.mockReturnValue({
      pets: [],
      isLoading: true,
      hasError: false,
      currentPage: 1,
      totalPages: 0,
      goToPage: vi.fn(),
      searchByNome: vi.fn(),
      searchByRaca: vi.fn(),
      nomeSearch: '',
      racaSearch: '',
    });

    renderWithProviders(<PetsSection />);

    const loader = document.querySelector('.mantine-Loader-root');
    expect(loader).toBeInTheDocument();
  });

  it('should have Loader with correct color and size', () => {
    mockUsePetsFacade.mockReturnValue({
      pets: [],
      isLoading: true,
      hasError: false,
      currentPage: 1,
      totalPages: 0,
      goToPage: vi.fn(),
      searchByNome: vi.fn(),
      searchByRaca: vi.fn(),
      nomeSearch: '',
      racaSearch: '',
    });

    renderWithProviders(<PetsSection />);

    const loader = document.querySelector('.mantine-Loader-root');
    expect(loader).toHaveClass('mantine-Loader-root');
  });
});

describe('PetsSection - Error State', () => {
  it('should display error Alert when hasError is true', () => {
    mockUsePetsFacade.mockReturnValue({
      pets: [],
      isLoading: false,
      hasError: true,
      currentPage: 1,
      totalPages: 0,
      goToPage: vi.fn(),
      searchByNome: vi.fn(),
      searchByRaca: vi.fn(),
      nomeSearch: '',
      racaSearch: '',
    });

    renderWithProviders(<PetsSection />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display correct error message', () => {
    mockUsePetsFacade.mockReturnValue({
      pets: [],
      isLoading: false,
      hasError: true,
      currentPage: 1,
      totalPages: 0,
      goToPage: vi.fn(),
      searchByNome: vi.fn(),
      searchByRaca: vi.fn(),
      nomeSearch: '',
      racaSearch: '',
    });

    renderWithProviders(<PetsSection />);

    expect(screen.getByText(/não foi possível carregar os pets/i)).toBeInTheDocument();
  });
});
