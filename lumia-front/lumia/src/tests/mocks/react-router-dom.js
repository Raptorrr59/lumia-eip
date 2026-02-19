import React from 'react';

const mockNavigate = jest.fn();
const mockUseParams = jest.fn(() => ({}));
const mockUseLocation = jest.fn(() => ({ pathname: '/', search: '', hash: '', state: null }));

module.exports = {
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: mockUseParams,
  useLocation: mockUseLocation,
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  MemoryRouter: ({ children }) => <div data-testid="memory-router">{children}</div>,
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props} data-testid="router-link">
      {children}
    </a>
  ),
};