import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { TutorList } from './TutorList';
import type { Tutor } from '../types';

describe('TutorList', () => {
  const mockOnEdit = vi.fn();
  const mockOnViewDetails = vi.fn();

  const mockTutores: Tutor[] = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@example.com',
      telefone: '(11) 98765-4321',
      endereco: 'Rua das Flores, 123',
      cpf: 12345678901,
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@example.com',
      telefone: '(21) 91234-5678',
      endereco: 'Av. Central, 456',
      cpf: 98765432100,
      foto: {
        id: 1,
        nome: 'maria.jpg',
        contentType: 'image/jpeg',
        url: 'https://example.com/maria.jpg',
      },
    },
  ];

  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnViewDetails.mockClear();
  });

  
  it('should show empty state when tutores list is empty', () => {
    renderWithProviders(<TutorList tutores={[]} />);

    expect(screen.getByText('Nenhum tutor encontrado')).toBeInTheDocument();
  });

  
  it('should render table headers', () => {
    renderWithProviders(<TutorList tutores={mockTutores} />);

    expect(screen.getByText('Tutor')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Telefone')).toBeInTheDocument();
    expect(screen.getByText('Endereço')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  
  it('should render all tutores in the list', () => {
    renderWithProviders(<TutorList tutores={mockTutores} />);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
    expect(screen.getByText('maria@example.com')).toBeInTheDocument();
  });

  
  it('should render avatar with initials when tutor has no photo', () => {
    renderWithProviders(<TutorList tutores={mockTutores} />);

   
    expect(screen.getByText('JO')).toBeInTheDocument();
  });

  
  it('should render photo when tutor has a photo', () => {
    renderWithProviders(<TutorList tutores={mockTutores} />);

    const images = screen.getAllByRole('img');
    const mariaImage = images.find(img => img.getAttribute('src') === 'https://example.com/maria.jpg');
    
    expect(mariaImage).toBeInTheDocument();
  });

  
  it('should format CPF with dots and dash', () => {
    renderWithProviders(<TutorList tutores={mockTutores} />);

    expect(screen.getByText('123.456.789-01')).toBeInTheDocument();
    expect(screen.getByText('987.654.321-00')).toBeInTheDocument();
  });

  
  it('should render contact information for each tutor', () => {
    renderWithProviders(<TutorList tutores={mockTutores} />);

    expect(screen.getByText('(11) 98765-4321')).toBeInTheDocument();
    expect(screen.getByText('(21) 91234-5678')).toBeInTheDocument();
    expect(screen.getByText('Rua das Flores, 123')).toBeInTheDocument();
    expect(screen.getByText('Av. Central, 456')).toBeInTheDocument();
  });

  
  it('should call onViewDetails when eye icon is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <TutorList tutores={mockTutores} onViewDetails={mockOnViewDetails} />
    );

    const eyeButtons = screen.getAllByRole('button');
    const firstEyeButton = eyeButtons[0]; 
    
    await user.click(firstEyeButton);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockTutores[0]);
  });

  
  it('should call onEdit when edit icon is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <TutorList tutores={mockTutores} onEdit={mockOnEdit} />
    );

    const actionButtons = screen.getAllByRole('button');
    const firstEditButton = actionButtons[1]; 
    
    await user.click(firstEditButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTutores[0]);
  });

  
  it('should render view and edit buttons for each tutor', () => {
    renderWithProviders(<TutorList tutores={mockTutores} />);

    const buttons = screen.getAllByRole('button');
    
    
    expect(buttons).toHaveLength(4);
  });

 
  it('should handle tutor without optional contact fields', () => {
    const minimalTutor: Tutor = {
      id: 3,
      nome: 'Pedro Costa',
      email: '',
      telefone: '',
      endereco: '',
      cpf: 11122233344,
    };

    renderWithProviders(<TutorList tutores={[minimalTutor]} />);

    expect(screen.getByText('Pedro Costa')).toBeInTheDocument();
    expect(screen.getByText('111.222.333-44')).toBeInTheDocument();
  });
});
