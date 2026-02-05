import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/test-utils';
import { TutorForm } from './TutorForm';
import type { Tutor } from '../types';

describe('TutorForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();
  const mockOnPhotoUpload = vi.fn();
  const mockOnPhotoDelete = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
    mockOnPhotoUpload.mockClear();
    mockOnPhotoDelete.mockClear();
  });

  it('should render all form fields in create mode', () => {
    renderWithProviders(
      <TutorForm onSubmit={mockOnSubmit} />
    );

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/endereço/i)).toBeInTheDocument();
    expect(screen.getByText(/selecione uma imagem/i)).toBeInTheDocument();
  });

  it('should populate form with initial data in edit mode', () => {
    const initialData: Partial<Tutor> = {
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 98765-4321',
      cpf: 12345678901,
      endereco: 'Rua das Flores, 123',
    };

    renderWithProviders(
      <TutorForm 
        initialData={initialData}
        onSubmit={mockOnSubmit}
        mode="edit"
      />
    );

    expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
    expect(screen.getByDisplayValue('joao@email.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('(11) 98765-4321')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123.456.789-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Rua das Flores, 123')).toBeInTheDocument();
  });

  it('should prevent submission with empty required fields', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <TutorForm onSubmit={mockOnSubmit} />
    );

    const submitButton = screen.getByRole('button', { name: /cadastrar tutor/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <TutorForm onSubmit={mockOnSubmit} />
    );

    await user.type(screen.getByLabelText(/nome completo/i), 'Maria Santos');
    await user.type(screen.getByLabelText(/email/i), 'maria@email.com');
    await user.type(screen.getByLabelText(/telefone/i), '11987654321');
    await user.type(screen.getByLabelText(/cpf/i), '12345678901');
    await user.type(screen.getByLabelText(/endereço/i), 'Av. Paulista, 1000');

    const submitButton = screen.getByRole('button', { name: /cadastrar tutor/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      const submittedData = mockOnSubmit.mock.calls[0][0];
      expect(submittedData.nome).toBe('Maria Santos');
      expect(submittedData.email).toBe('maria@email.com');
      expect(submittedData.telefone).toBe('(11) 98765-4321');
      expect(submittedData.cpf).toBe('123.456.789-01');
      expect(submittedData.endereco).toBe('Av. Paulista, 1000');
    });
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <TutorForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should show photo preview when file is selected in create mode', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <TutorForm 
        onSubmit={mockOnSubmit}
        onPhotoUpload={mockOnPhotoUpload}
        mode="create"
      />
    );

    const file = new File(['photo content'], 'tutor-photo.jpg', { type: 'image/jpeg' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(screen.getByAltText('Pré-visualização')).toBeInTheDocument();
      expect(screen.getByText(/a foto será enviada após o cadastro do tutor/i)).toBeInTheDocument();
    });
  });

  it('should display existing photo in edit mode', () => {
    const initialData: Partial<Tutor> = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 98765-4321',
      cpf: 12345678901,
      endereco: 'Rua das Flores, 123',
      foto: {
        id: 1,
        url: 'https://example.com/photo.jpg',
        nome: 'photo.jpg',
        contentType: 'image/jpeg'
      }
    };

    renderWithProviders(
      <TutorForm 
        initialData={initialData}
        onSubmit={mockOnSubmit}
        onPhotoDelete={mockOnPhotoDelete}
        mode="edit"
      />
    );

    expect(screen.getByAltText('João Silva')).toBeInTheDocument();
    expect(screen.getByText(/clique no ícone da lixeira para remover a foto atual/i)).toBeInTheDocument();
  });

  it('should call onPhotoDelete when delete photo icon is clicked', async () => {
    const user = userEvent.setup();
    
    const initialData: Partial<Tutor> = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 98765-4321',
      cpf: 12345678901,
      endereco: 'Rua das Flores, 123',
      foto: {
        id: 1,
        url: 'https://example.com/photo.jpg',
        nome: 'photo.jpg',
        contentType: 'image/jpeg'
      }
    };

    renderWithProviders(
      <TutorForm 
        initialData={initialData}
        onSubmit={mockOnSubmit}
        onPhotoDelete={mockOnPhotoDelete}
        mode="edit"
      />
    );

    const deleteButtons = screen.getAllByRole('button');
    const deletePhotoButton = deleteButtons.find(btn => btn.querySelector('svg'));
    
    if (deletePhotoButton) {
      await user.click(deletePhotoButton);
      expect(mockOnPhotoDelete).toHaveBeenCalledWith(1);
    }
  });

  it('should show loading state on submit button', () => {
    renderWithProviders(
      <TutorForm onSubmit={mockOnSubmit} isLoading={true} />
    );

    const submitButton = screen.getByRole('button', { name: /cadastrar tutor/i });
    expect(submitButton).toBeDisabled();
  });

  it('should change button text based on mode', () => {
    const { rerender } = renderWithProviders(
      <TutorForm onSubmit={mockOnSubmit} mode="create" />
    );

    expect(screen.getByRole('button', { name: /cadastrar tutor/i })).toBeInTheDocument();

    rerender(
      <TutorForm onSubmit={mockOnSubmit} mode="edit" />
    );

    expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument();
  });

  it('should remove photo preview when trash icon is clicked', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <TutorForm 
        onSubmit={mockOnSubmit}
        onPhotoUpload={mockOnPhotoUpload}
        mode="create"
      />
    );

    const file = new File(['photo content'], 'tutor-photo.jpg', { type: 'image/jpeg' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(screen.getByAltText('Pré-visualização')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button');
    const deletePreviewButton = deleteButtons.find(btn => btn.querySelector('svg'));
    
    if (deletePreviewButton) {
      await user.click(deletePreviewButton);
      
      await waitFor(() => {
        expect(screen.queryByAltText('Pré-visualização')).not.toBeInTheDocument();
        expect(screen.getByText(/selecione uma imagem/i)).toBeInTheDocument();
      });
    }
  });
});
