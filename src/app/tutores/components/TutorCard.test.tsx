import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { TutorCard } from './TutorCard';
import type { Tutor } from '../types';

describe('TutorCard', () => {
  const mockOnEdit = vi.fn();
  const mockOnViewDetails = vi.fn();

  const mockTutor: Tutor = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@example.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Flores, 123',
    cpf: 12345678901,
  };

  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnViewDetails.mockClear();
  });

  
  it('should render tutor basic information', () => {
    renderWithProviders(<TutorCard tutor={mockTutor} />);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText(/tutor/i)).toBeInTheDocument();
    expect(screen.getByText('CPF: 123.456.789-01')).toBeInTheDocument();
  });

  
  it('should render contact information', () => {
    renderWithProviders(<TutorCard tutor={mockTutor} />);

    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
    expect(screen.getByText('(11) 98765-4321')).toBeInTheDocument();
    expect(screen.getByText('Rua das Flores, 123')).toBeInTheDocument();
  });

  
  it('should render avatar with initials when tutor has no photo', () => {
    renderWithProviders(<TutorCard tutor={mockTutor} />);

    
    expect(screen.getByText('JO')).toBeInTheDocument();
  });

 
  it('should render photo when tutor has a photo', () => {
    const tutorWithPhoto: Tutor = {
      ...mockTutor,
      foto: {
        id: 1,
        nome: 'joao.jpg',
        contentType: 'image/jpeg',
        url: 'https://example.com/joao.jpg',
      },
    };

    renderWithProviders(<TutorCard tutor={tutorWithPhoto} />);

    const image = screen.getByAltText('João Silva');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/joao.jpg');
  });

  
  it('should call onViewDetails when Detalhes button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <TutorCard tutor={mockTutor} onViewDetails={mockOnViewDetails} />
    );

    const detalhesButton = screen.getByRole('button', { name: /detalhes/i });
    await user.click(detalhesButton);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockTutor);
  });

 
  it('should call onEdit when Editar button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <TutorCard tutor={mockTutor} onEdit={mockOnEdit} />
    );

    const editarButton = screen.getByRole('button', { name: /editar/i });
    await user.click(editarButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTutor);
  });

 
  it('should render both Detalhes and Editar buttons', () => {
    renderWithProviders(<TutorCard tutor={mockTutor} />);

    expect(screen.getByRole('button', { name: /detalhes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });

 
  it('should format CPF with dots and dash', () => {
    const tutorWithCPF: Tutor = {
      ...mockTutor,
      cpf: 98765432100,
    };

    renderWithProviders(<TutorCard tutor={tutorWithCPF} />);

    expect(screen.getByText('CPF: 987.654.321-00')).toBeInTheDocument();
  });

 
  it('should not render contact fields when they are missing', () => {
    const minimalTutor: Tutor = {
      id: 2,
      nome: 'Maria Santos',
      email: '',
      telefone: '',
      endereco: '',
      cpf: 11122233344,
    };

    renderWithProviders(<TutorCard tutor={minimalTutor} />);

    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });
});
