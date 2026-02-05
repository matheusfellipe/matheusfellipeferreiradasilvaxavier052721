import '@testing-library/jest-dom';

// Mock ResizeObserver for Mantine components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
