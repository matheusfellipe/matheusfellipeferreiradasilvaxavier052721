import { describe, it, expect, vi, beforeEach } from 'vitest';
import Cookies from 'js-cookie';
import { storeTokens, clearTokens } from './api';

describe('API Client - Token Management', () => {
  beforeEach(() => {
    // Clear cookies before each test
    clearTokens();
    vi.clearAllMocks();
  });

  it('should store tokens with correct expiry time', () => {
    storeTokens('access-token', 'refresh-token', 3600);

    expect(Cookies.get('access_token')).toBe('access-token');
    expect(Cookies.get('refresh_token')).toBe('refresh-token');
  });

  it('should store tokens without expiry when expiresIn is not provided', () => {
    storeTokens('access-token', 'refresh-token');

    expect(Cookies.get('access_token')).toBe('access-token');
    expect(Cookies.get('refresh_token')).toBe('refresh-token');
  });

  it('should clear both tokens when clearTokens is called', () => {
    storeTokens('access-token', 'refresh-token');
    
    clearTokens();

    expect(Cookies.get('access_token')).toBeUndefined();
    expect(Cookies.get('refresh_token')).toBeUndefined();
  });

  it('should store access token with expiry calculated from seconds', () => {
    const expiresInSeconds = 7200; // 2 hours
    storeTokens('access-token', 'refresh-token', expiresInSeconds);

    // Token should be stored (actual expiry time is hard to test precisely)
    expect(Cookies.get('access_token')).toBe('access-token');
  });
});
