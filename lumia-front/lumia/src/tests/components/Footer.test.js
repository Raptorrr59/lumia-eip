import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../../components/Footer';
import { LangProvider } from '../../LangProvider';

// Mock react-router-dom
jest.mock('react-router-dom', () => {
    return require('../mocks/react-router-dom');
});

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

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock window.open
window.open = jest.fn();

// Test wrapper
const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

const renderFooter = () => {
    return render(
        <TestWrapper>
            <Footer />
        </TestWrapper>
    );
};

describe('Footer Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        test('renders without crashing', () => {
            renderFooter();
            expect(document.body).toBeInTheDocument();
        });

        test('renders footer element', () => {
            renderFooter();
            expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        });

        test('renders links', () => {
            renderFooter();
            const links = screen.getAllByRole('link');
            expect(links.length).toBeGreaterThan(0);
        });

        test('renders copyright', () => {
            renderFooter();
            const currentYear = new Date().getFullYear();
            expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
        });
    });

    describe('Links', () => {
        test('renders multiple links', () => {
            renderFooter();
            const links = screen.getAllByRole('link');
            expect(links.length).toBeGreaterThan(5);
        });
    });

    describe('Social Media', () => {
        test('renders social buttons', () => {
            renderFooter();
            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThan(0);
        });

        test('Instagram button opens link', () => {
            renderFooter();
            const instagramButton = screen.getByRole('button', { name: /instagram/i });
            fireEvent.click(instagramButton);
            expect(window.open).toHaveBeenCalled();
        });
    });
});
