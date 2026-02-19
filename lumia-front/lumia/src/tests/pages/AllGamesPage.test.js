import React from 'react';
import { render, screen } from '@testing-library/react';
import AllGamesPage from '../../pages/AllGamesPage';
import { LangProvider } from '../../LangProvider';
import { GamesData } from '../../pages/Games';

jest.mock('framer-motion', () => {
  return require('../mocks/framer-motion');
});

// Mock RedirectionGame
jest.mock('../../components/redirections/RedirectionGames', () => {
  return function MockRedirectionGame({ name }) {
    return <div data-testid="game-card">{name}</div>;
  };
});

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

describe('Page AllGamesPage', () => {
  const renderAllGamesPage = () => {
    return render(
      <LangProvider>
        <AllGamesPage />
      </LangProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders page without crashing', () => {
    renderAllGamesPage();
    expect(document.body).toBeInTheDocument();
  });

  test('displays page title', () => {
    renderAllGamesPage();
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('displays game cards', () => {
    renderAllGamesPage();
    const gameCards = screen.getAllByTestId('game-card');
    expect(gameCards.length).toBeGreaterThan(0);
  });

  test('displays correct number of games', () => {
    renderAllGamesPage();
    const gameCards = screen.getAllByTestId('game-card');
    expect(gameCards).toHaveLength(GamesData.length);
  });

  test('displays all game names', () => {
    renderAllGamesPage();
    GamesData.forEach(game => {
      expect(screen.getByText(game.name)).toBeInTheDocument();
    });
  });
});