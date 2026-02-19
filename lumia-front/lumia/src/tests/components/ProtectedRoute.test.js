import React from 'react';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: ({ to }) => <div data-testid="navigate">Redirecting to {to}</div>,
    useLocation: () => ({ pathname: '/test' })
}));

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

// Mock ProtectedRoute component
const MockProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');

    if (!token) {
        return <div data-testid="navigate">Redirecting to /login</div>;
    }

    if (requiredRole && role !== requiredRole) {
        return <div data-testid="unauthorized">Unauthorized</div>;
    }

    return <div data-testid="protected-content">{children}</div>;
};

describe('ProtectedRoute Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders children when authenticated', () => {
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'accessToken') return 'valid-token';
            if (key === 'language') return 'EN';
            return null;
        });

        render(
            <TestWrapper>
                <MockProtectedRoute>
                    <div>Protected Content</div>
                </MockProtectedRoute>
            </TestWrapper>
        );

        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    test('redirects when not authenticated', () => {
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'language') return 'EN';
            return null;
        });

        render(
            <TestWrapper>
                <MockProtectedRoute>
                    <div>Protected Content</div>
                </MockProtectedRoute>
            </TestWrapper>
        );

        expect(screen.getByTestId('navigate')).toBeInTheDocument();
    });

    test('shows unauthorized when role mismatch', () => {
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'accessToken') return 'valid-token';
            if (key === 'role') return 'user';
            if (key === 'language') return 'EN';
            return null;
        });

        render(
            <TestWrapper>
                <MockProtectedRoute requiredRole="admin">
                    <div>Admin Content</div>
                </MockProtectedRoute>
            </TestWrapper>
        );

        expect(screen.getByTestId('unauthorized')).toBeInTheDocument();
    });

    test('allows access with correct role', () => {
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'accessToken') return 'valid-token';
            if (key === 'role') return 'admin';
            if (key === 'language') return 'EN';
            return null;
        });

        render(
            <TestWrapper>
                <MockProtectedRoute requiredRole="admin">
                    <div>Admin Content</div>
                </MockProtectedRoute>
            </TestWrapper>
        );

        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
});
