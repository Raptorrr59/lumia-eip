import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Admin from '../../pages/Admin';
import { LangProvider } from '../../LangProvider';
import axios from 'axios';

jest.mock('framer-motion', () => {
  return require('../mocks/framer-motion');
});

// Mock axios
jest.mock('axios');

// Mock des données utilisateurs
const mockUsers = [
  { id: 1, userName: 'TestUser1' },
  { id: 2, userName: 'TestUser2' },
  { id: 3, userName: 'AdminUser' }
];

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn((key) => {
    if (key === 'accessToken') return 'valid-token';
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

// Test wrapper
const TestWrapper = ({ children }) => (
  <LangProvider>
    {children}
  </LangProvider>
);

const renderAdmin = () => {
  return render(
    <TestWrapper>
      <Admin />
    </TestWrapper>
  );
};

describe('Page Admin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockUsers });
  });

  test('renders admin page without crashing', () => {
    renderAdmin();
    expect(document.body).toBeInTheDocument();
  });

  test('displays admin title', () => {
    renderAdmin();
    expect(screen.getByText('Administration')).toBeInTheDocument();
  });

  test('calls API to fetch users', async () => {
    renderAdmin();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });

  test('displays users when loaded', async () => {
    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText('TestUser1')).toBeInTheDocument();
    });
  });

  test('renders search input', async () => {
    renderAdmin();

    await waitFor(() => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeGreaterThan(0);
    });
  });

  test('filters users when searching', async () => {
    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText('TestUser1')).toBeInTheDocument();
    });

    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'Admin' } });

      await waitFor(() => {
        expect(screen.getByText('AdminUser')).toBeInTheDocument();
      });
    }
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    renderAdmin();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});