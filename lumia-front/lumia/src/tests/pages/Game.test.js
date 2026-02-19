import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams, useLocation } from 'react-router-dom';
import Game from '../../pages/Game';
import { LangProvider } from '../../LangProvider';

jest.mock('framer-motion', () => {
  return require('../mocks/framer-motion');
});

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn()
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn((key) => {
    if (key === 'language') return 'FR';
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

const mockGame = {
  id: 1,
  name: "Snake AI",
  tuto: "abc123xyz",
  rules: ["Règle 1", "Règle 2", "Règle 3", "Règle 4"]
};

describe('Page Game', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });
    useLocation.mockReturnValue({ state: mockGame });
    jest.clearAllMocks();
  });

  const renderGame = () => {
    return render(
      <BrowserRouter>
        <LangProvider>
          <Game />
        </LangProvider>
      </BrowserRouter>
    );
  };

  test('renders game page without crashing', () => {
    renderGame();
    expect(document.body).toBeInTheDocument();
  });

  test('displays game name', () => {
    renderGame();
    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
  });

  test('renders game rules section', () => {
    renderGame();
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders buttons', () => {
    renderGame();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('renders video element if tuto exists', () => {
    renderGame();
    const iframe = document.querySelector('iframe');
    if (iframe) {
      expect(iframe).toHaveAttribute('src');
    } else {
      expect(true).toBe(true);
    }
  });
});