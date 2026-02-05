import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './useAuth';

// Mock AuthService
vi.mock('./auth.service', () => {
  return {
    default: class {
      login({ username, password }: { username: string; password: string }) {
        if (username === 'user' && password === 'pass') {
          return Promise.resolve({
            access_token: 'token',
            refresh_token: 'refresh',
            expires_in: 3600,
          });
        }
        return Promise.resolve({});
      }
    },
  };
});

describe('useAuth', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );

  it('should login and set cookies', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({ username: 'user', password: 'pass' });
    });

    expect(document.cookie).toContain('access_token=token');
    expect(document.cookie).toContain('refresh_token=refresh');
  });

  it('should throw error for invalid login', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      result.current.login({ username: 'wrong', password: 'wrong' })
    ).rejects.toThrow();
  });

  it('should logout and remove cookies', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(document.cookie).not.toContain('access_token');
  });
});
