import '@testing-library/jest-dom';
import '@testing-library/react';

// Mock window.scrollTo (not implemented in jsdom)
window.scrollTo = jest.fn();

// Suppress ALL console output during tests
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
  console.log.mockRestore?.();
  console.warn.mockRestore?.();
  console.error.mockRestore?.();
});

global.IntersectionObserver = class {
  constructor() { }
  observe() { }
  unobserve() { }
  disconnect() { }
};
