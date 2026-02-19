import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Accueil from '../../pages/Accueil';
import { LangProvider } from '../../LangProvider';
import { ThemeProvider } from '../../contexts/ThemeContext';

jest.mock('framer-motion', () => {
  return require('../mocks/framer-motion');
});

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: [
      { userName: 'Player1', score: 1000 },
      { userName: 'Player2', score: 800 },
      { userName: 'Player3', score: 600 }
    ]
  })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

// Mock modal components
jest.mock('../../components/modal/LoginModal', () => {
  return function MockLoginModal() { return null; };
});

jest.mock('../../components/modal/SignUpModal', () => {
  return function MockSignUpModal() { return null; };
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn((key) => {
    if (key === 'language') return 'EN';
    if (key === 'id') return null;
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

describe('Page Accueil', () => {
  const renderAccueil = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <LangProvider>
            <Accueil />
          </LangProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders home page without crashing', () => {
    renderAccueil();
    expect(document.body).toBeInTheDocument();
  });

  test('renders page headings', () => {
    renderAccueil();
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders navigation links', () => {
    renderAccueil();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  test('renders buttons', () => {
    renderAccueil();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('renders main sections', () => {
    renderAccueil();
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });
});
