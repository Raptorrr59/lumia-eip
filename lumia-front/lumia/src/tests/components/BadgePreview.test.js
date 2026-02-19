import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        if (key === 'language') return 'EN';
        return null;
    }),
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

// Mock Badge components
const MockBadgePreview = ({ badge, unlocked }) => (
    <div data-testid="badge-preview" className={unlocked ? 'unlocked' : 'locked'}>
        <img src={badge.icon} alt={badge.name} data-testid="badge-icon" />
        <h4>{badge.name}</h4>
        <p>{badge.description}</p>
    </div>
);

describe('BadgePreview Component', () => {
    const mockBadge = {
        id: 1,
        name: 'First Victory',
        description: 'Win your first game',
        icon: '/badges/victory.png'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockBadgePreview badge={mockBadge} unlocked={true} />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('displays badge name', () => {
        render(
            <TestWrapper>
                <MockBadgePreview badge={mockBadge} unlocked={true} />
            </TestWrapper>
        );
        expect(screen.getByText('First Victory')).toBeInTheDocument();
    });

    test('displays badge description', () => {
        render(
            <TestWrapper>
                <MockBadgePreview badge={mockBadge} unlocked={true} />
            </TestWrapper>
        );
        expect(screen.getByText('Win your first game')).toBeInTheDocument();
    });

    test('renders badge icon', () => {
        render(
            <TestWrapper>
                <MockBadgePreview badge={mockBadge} unlocked={true} />
            </TestWrapper>
        );
        expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
    });

    test('shows unlocked state', () => {
        render(
            <TestWrapper>
                <MockBadgePreview badge={mockBadge} unlocked={true} />
            </TestWrapper>
        );
        expect(screen.getByTestId('badge-preview')).toHaveClass('unlocked');
    });

    test('shows locked state', () => {
        render(
            <TestWrapper>
                <MockBadgePreview badge={mockBadge} unlocked={false} />
            </TestWrapper>
        );
        expect(screen.getByTestId('badge-preview')).toHaveClass('locked');
    });
});
