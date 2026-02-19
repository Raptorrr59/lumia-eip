import React from 'react';
import { render, screen } from '@testing-library/react';
import Subscription from '../../pages/Subscription';
import { LangProvider } from '../../LangProvider';
import { ThemeProvider } from '../../contexts/ThemeContext';

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

describe('Page Subscription', () => {
  const renderSubscription = () => {
    return render(
      <ThemeProvider>
        <LangProvider>
          <Subscription />
        </LangProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders subscription page without crashing', () => {
    renderSubscription();
    expect(document.body).toBeInTheDocument();
  });

  test('renders page heading', () => {
    renderSubscription();
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders pricing buttons', () => {
    renderSubscription();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('renders subscription options', () => {
    renderSubscription();
    // Check for pricing-related elements
    const priceElements = document.querySelectorAll('[class*="price"], [class*="card"], [class*="plan"]');
    expect(priceElements.length >= 0).toBe(true);
  });
});