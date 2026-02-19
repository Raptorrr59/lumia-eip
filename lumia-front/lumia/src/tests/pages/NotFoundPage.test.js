import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock react-router-dom
jest.mock('react-router-dom', () => {
    return require('../mocks/react-router-dom');
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    Home: () => <span>Home Icon</span>,
    ArrowLeft: () => <span>Arrow Icon</span>,
    Search: () => <span>Search Icon</span>
}));

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'language': 'EN'
        };
        return storage[key] || null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Mock window.history
window.history.back = jest.fn();

// Test wrapper
const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

const renderNotFoundPage = () => {
    return render(
        <TestWrapper>
            <NotFoundPage />
        </TestWrapper>
    );
};

describe('NotFoundPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders page without crashing', () => {
        renderNotFoundPage();
        expect(document.body).toBeInTheDocument();
    });

    test('renders 404 text', () => {
        renderNotFoundPage();
        expect(screen.getByText('404')).toBeInTheDocument();
    });

    test('renders heading', () => {
        renderNotFoundPage();
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBeGreaterThan(0);
    });

    test('renders navigation elements', () => {
        renderNotFoundPage();
        const elements = document.querySelectorAll('a, button');
        expect(elements.length).toBeGreaterThan(0);
    });
});
