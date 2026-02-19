import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CGU, CGV, MentionsLegales, Confidentialite } from '../../pages/LegalPages';
import { LangProvider } from '../../LangProvider';

jest.mock('framer-motion', () => {
  return require('../mocks/framer-motion');
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn((key) => {
    if (key === 'language') return 'EN';
    return null;
  }),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LangProvider>
      {children}
    </LangProvider>
  </BrowserRouter>
);

describe('Legal Pages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CGU Page', () => {
    test('renders CGU page without crashing', () => {
      render(<TestWrapper><CGU /></TestWrapper>);
      expect(document.body).toBeInTheDocument();
    });

    test('renders heading', () => {
      render(<TestWrapper><CGU /></TestWrapper>);
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('CGV Page', () => {
    test('renders CGV page without crashing', () => {
      render(<TestWrapper><CGV /></TestWrapper>);
      expect(document.body).toBeInTheDocument();
    });

    test('renders heading', () => {
      render(<TestWrapper><CGV /></TestWrapper>);
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('MentionsLegales Page', () => {
    test('renders MentionsLegales page without crashing', () => {
      render(<TestWrapper><MentionsLegales /></TestWrapper>);
      expect(document.body).toBeInTheDocument();
    });

    test('renders heading', () => {
      render(<TestWrapper><MentionsLegales /></TestWrapper>);
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('Confidentialite Page', () => {
    test('renders Confidentialite page without crashing', () => {
      render(<TestWrapper><Confidentialite /></TestWrapper>);
      expect(document.body).toBeInTheDocument();
    });

    test('renders heading', () => {
      render(<TestWrapper><Confidentialite /></TestWrapper>);
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });
  });
});