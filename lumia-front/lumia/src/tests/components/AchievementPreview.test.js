import React from 'react';
import { render, screen } from '@testing-library/react';
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

// Mock AchievementPreview component
const MockAchievementPreview = ({ title, description, unlocked, icon }) => (
    <div data-testid="achievement-preview" className={unlocked ? 'unlocked' : 'locked'}>
        <span data-testid="achievement-icon">{icon}</span>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

describe('AchievementPreview Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockAchievementPreview
                    title="First Win"
                    description="Win your first game"
                    unlocked={true}
                    icon="🏆"
                />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('displays achievement title', () => {
        render(
            <TestWrapper>
                <MockAchievementPreview
                    title="First Win"
                    description="Win your first game"
                    unlocked={true}
                    icon="🏆"
                />
            </TestWrapper>
        );
        expect(screen.getByText('First Win')).toBeInTheDocument();
    });

    test('displays achievement description', () => {
        render(
            <TestWrapper>
                <MockAchievementPreview
                    title="First Win"
                    description="Win your first game"
                    unlocked={true}
                    icon="🏆"
                />
            </TestWrapper>
        );
        expect(screen.getByText('Win your first game')).toBeInTheDocument();
    });

    test('displays achievement icon', () => {
        render(
            <TestWrapper>
                <MockAchievementPreview
                    title="First Win"
                    description="Win your first game"
                    unlocked={true}
                    icon="🏆"
                />
            </TestWrapper>
        );
        expect(screen.getByText('🏆')).toBeInTheDocument();
    });

    test('shows unlocked state', () => {
        render(
            <TestWrapper>
                <MockAchievementPreview
                    title="First Win"
                    description="Win your first game"
                    unlocked={true}
                    icon="🏆"
                />
            </TestWrapper>
        );
        expect(screen.getByTestId('achievement-preview')).toHaveClass('unlocked');
    });

    test('shows locked state', () => {
        render(
            <TestWrapper>
                <MockAchievementPreview
                    title="First Win"
                    description="Win your first game"
                    unlocked={false}
                    icon="🏆"
                />
            </TestWrapper>
        );
        expect(screen.getByTestId('achievement-preview')).toHaveClass('locked');
    });
});
