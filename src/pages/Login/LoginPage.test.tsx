// LoginPage.test.tsx
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import LoginPage from './Login.page';
import { expect, test } from 'vitest';

test('renders login form', () => {
  renderWithProviders(<LoginPage />);

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
});
