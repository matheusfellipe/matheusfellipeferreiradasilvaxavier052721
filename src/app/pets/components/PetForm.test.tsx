import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { PetForm } from './PetForm';
import type { Pet } from '../types';

describe('PetForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  
  it('should render all form fields in create mode', () => {
    renderWithProviders(<PetForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/nome do pet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/raça/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/idade/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /selecione uma imagem/i })).toBeInTheDocument();
  });

 
  it('should render form with initial data in edit mode', () => {
    const initialData: Partial<Pet> = {
      nome: 'Rex',
      raca: 'Golden Retriever',
      idade: 5,
    };

    renderWithProviders(
      <PetForm
        onSubmit={mockOnSubmit}
        initialData={initialData}
        mode="edit"
      />
    );

    expect(screen.getByDisplayValue('Rex')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Golden Retriever')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  
  it('should not call onSubmit when required fields are empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PetForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /cadastrar pet/i });
    await user.click(submitButton);

    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  
  it('should call onSubmit with correct data when form is valid', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PetForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/nome do pet/i), 'Luna');
    await user.type(screen.getByLabelText(/raça/i), 'Husky');
    
    const idadeInput = screen.getByLabelText(/idade/i);
    await user.clear(idadeInput);
    await user.type(idadeInput, '3');

    await user.click(screen.getByRole('button', { name: /cadastrar pet/i }));

    
    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnSubmit.mock.calls[0][0]).toEqual({
      nome: 'Luna',
      raca: 'Husky',
      idade: 3,
    });
  });

  
  it('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PetForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

 
  it('should show photo preview when file is selected in create mode', async () => {
    const user = userEvent.setup();
    const file = new File(['dummy content'], 'pet.png', { type: 'image/png' });
    
    renderWithProviders(<PetForm onSubmit={mockOnSubmit} mode="create" />);

    
    
    const hiddenInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    await user.upload(hiddenInput, file);

    expect(await screen.findByText(/a foto será enviada após o cadastro do pet/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pré-visualização/i)).toBeInTheDocument();
  });

 
  it('should show existing photo in edit mode', () => {
    const initialData: Partial<Pet> = {
      id: 1,
      nome: 'Thor',
      raca: 'Labrador',
      idade: 4,
      foto: {
        id: 1,
        nome: 'thor-photo.jpg',
        contentType: 'image/jpeg',
        url: 'https://example.com/pet.jpg',
      },
    };

    renderWithProviders(
      <PetForm
        onSubmit={mockOnSubmit}
        initialData={initialData}
        mode="edit"
      />
    );

    const image = screen.getByAltText('Thor');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/pet.jpg');
  });

  
  it('should show loading state on submit button when isLoading is true', () => {
    renderWithProviders(<PetForm onSubmit={mockOnSubmit} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /cadastrar pet/i });
    expect(submitButton).toHaveAttribute('data-loading', 'true');
  });

 
  it('should change submit button text based on mode', () => {
    const { rerender } = renderWithProviders(<PetForm onSubmit={mockOnSubmit} mode="create" />);
    
    expect(screen.getByRole('button', { name: /cadastrar pet/i })).toBeInTheDocument();

    rerender(<PetForm onSubmit={mockOnSubmit} mode="edit" />);
    
    expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument();
  });
});
