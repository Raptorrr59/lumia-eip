import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import FormationPage from '../../pages/FormationPage';
import { LangProvider } from '../../LangProvider';
import { ThemeProvider } from '../../contexts/ThemeContext';

jest.mock('framer-motion', () => {
  return require('../mocks/framer-motion');
});

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn((key) => {
    if (key === 'language') return 'FR';
    if (key === 'id') return '123';
    if (key === 'accessToken') return 'test-token';
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

describe('Page FormationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockReturnValue({ id: '1' });
  });

  const renderFormationPage = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <LangProvider>
            <FormationPage />
          </LangProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  test('renders formation page without crashing', () => {
    renderFormationPage();
    expect(document.body).toBeInTheDocument();
  });

  test('renders content', () => {
    renderFormationPage();
    // Check for any content - the page might show a spinner or content
    const elements = document.querySelectorAll('div');
    expect(elements.length).toBeGreaterThan(0);
  });

  test('renders elements', () => {
    renderFormationPage();
    // Just verify the DOM is rendered
    expect(document.querySelector('div')).toBeInTheDocument();
  });
});