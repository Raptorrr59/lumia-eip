import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../pages/About';
import { LangProvider } from '../../LangProvider';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock framer-motion
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

describe('Page About', () => {
  const renderAbout = () => {
    return render(
      <ThemeProvider>
        <LangProvider>
          <About />
        </LangProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders about page without crashing', () => {
    renderAbout();
    expect(document.body).toBeInTheDocument();
  });

  test('renders page headings', () => {
    renderAbout();
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders team section with images', () => {
    renderAbout();
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  test('renders team member names', () => {
    renderAbout();
    // Check for any team member - use more flexible matching
    const names = screen.queryAllByText(/Marc|Lucas|Tiago|Julien|Corentin|Pierre-Vincent/i);
    expect(names.length).toBeGreaterThan(0);
  });

  test('renders developer roles', () => {
    renderAbout();
    // Check for developer roles in any language
    const developerText = screen.queryAllByText(/Developer|Développeur/i);
    expect(developerText.length).toBeGreaterThan(0);
  });

  test('renders values section', () => {
    renderAbout();
    // Check for value keywords in any language
    const values = screen.queryAllByText(/Innovation|Accessibilit|Community|Commun/i);
    expect(values.length).toBeGreaterThan(0);
  });
});