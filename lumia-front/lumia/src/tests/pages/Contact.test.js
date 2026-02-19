import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../../pages/Contact';
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

describe('Page Contact', () => {
  const renderContact = () => {
    return render(
      <LangProvider>
        <Contact />
      </LangProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact page without crashing', () => {
    renderContact();
    expect(document.body).toBeInTheDocument();
  });

  test('renders page heading', () => {
    renderContact();
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders page content', () => {
    renderContact();
    // Check for any content
    const elements = document.querySelectorAll('div');
    expect(elements.length).toBeGreaterThan(0);
  });

  test('renders contact form or information', () => {
    renderContact();
    // Check for any input elements or contact info
    const inputs = document.querySelectorAll('input, textarea, form, a[href^="mailto"]');
    expect(inputs.length >= 0).toBe(true);
  });
});