import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Games from '../../pages/Games';
import { LangProvider } from '../../LangProvider';

jest.mock('framer-motion', () => {
  return require('../mocks/framer-motion');
});

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Mock Tutorial components
jest.mock('../../components/tutorials/TutorialPopup', () => {
  return function MockTutorialPopup() { return null; };
});

jest.mock('../../components/tutorials/TutorialInteractif', () => {
  return function MockTutorialInteractif() { return null; };
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn((key) => {
    if (key === 'language') return 'EN';
    if (key === 'tutoGames') return 'false';
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

describe('Page Games', () => {
  const renderGames = () => {
    return render(
      <BrowserRouter>
        <LangProvider>
          <Games />
        </LangProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders games page without crashing', () => {
    renderGames();
    expect(document.body).toBeInTheDocument();
  });

  test('renders page heading', () => {
    renderGames();
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders game cards', () => {
    renderGames();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  test('renders game images', () => {
    renderGames();
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});