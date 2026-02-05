import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import FilterSection from './FilterSection';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('FilterSection - Search Inputs', () => {
  it('should call onSearchNome when user types in nome input', () => {
    const handleSearchNome = vi.fn();
    const handleSearchRaca = vi.fn();

    renderWithProviders(
      <FilterSection
        nomeValue=""
        racaValue=""
        onSearchNome={handleSearchNome}
        onSearchRaca={handleSearchRaca}
      />
    );

    const nomeInput = screen.getByPlaceholderText('Buscar por nome...');
    fireEvent.change(nomeInput, { target: { value: 'Rex' } });

    expect(handleSearchNome).toHaveBeenCalledWith('Rex');
  });

  it('should call onSearchRaca when user types in raca input', () => {
    const handleSearchNome = vi.fn();
    const handleSearchRaca = vi.fn();

    renderWithProviders(
      <FilterSection
        nomeValue=""
        racaValue=""
        onSearchNome={handleSearchNome}
        onSearchRaca={handleSearchRaca}
      />
    );

    const racaInput = screen.getByPlaceholderText('Buscar por raça...');
    fireEvent.change(racaInput, { target: { value: 'Golden Retriever' } });

    expect(handleSearchRaca).toHaveBeenCalledWith('Golden Retriever');
  });

  it('should display controlled value in nome input', () => {
    const handleSearchNome = vi.fn();
    const handleSearchRaca = vi.fn();

    renderWithProviders(
      <FilterSection
        nomeValue="Luna"
        racaValue=""
        onSearchNome={handleSearchNome}
        onSearchRaca={handleSearchRaca}
      />
    );

    const nomeInput = screen.getByPlaceholderText('Buscar por nome...') as HTMLInputElement;
    expect(nomeInput.value).toBe('Luna');
  });

  it('should display controlled value in raca input', () => {
    const handleSearchNome = vi.fn();
    const handleSearchRaca = vi.fn();

    renderWithProviders(
      <FilterSection
        nomeValue=""
        racaValue="Siamês"
        onSearchNome={handleSearchNome}
        onSearchRaca={handleSearchRaca}
      />
    );

    const racaInput = screen.getByPlaceholderText('Buscar por raça...') as HTMLInputElement;
    expect(racaInput.value).toBe('Siamês');
  });

  it('should navigate to /pets/create when Cadastrar Pet button is clicked', async () => {
    const user = userEvent.setup();
    const handleSearchNome = vi.fn();
    const handleSearchRaca = vi.fn();

    renderWithProviders(
      <FilterSection
        nomeValue=""
        racaValue=""
        onSearchNome={handleSearchNome}
        onSearchRaca={handleSearchRaca}
      />
    );

    const cadastrarButton = screen.getByRole('button', { name: /cadastrar pet/i });
    await user.click(cadastrarButton);

    expect(mockNavigate).toHaveBeenCalledWith('/pets/create');
  });
});
