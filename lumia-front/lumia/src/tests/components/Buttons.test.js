import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonLeaderboard from '../../components/buttons/ButtonLeaderboard';
import ButtonMultiplayer from '../../components/buttons/ButtonMultiplayer';
import ButtonTrainAI from '../../components/buttons/ButtonTrainAI';
import { LangProvider } from '../../LangProvider';

// Mock localStorage for language
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

// Test wrapper
const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

describe('Button Components', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('ButtonLeaderboard', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <ButtonLeaderboard onClick={jest.fn()} showLeaderboard={false} />
                </TestWrapper>
            );
            expect(document.body).toBeInTheDocument();
        });

        test('renders button element', () => {
            render(
                <TestWrapper>
                    <ButtonLeaderboard onClick={jest.fn()} showLeaderboard={false} />
                </TestWrapper>
            );
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });

        test('calls onClick when clicked', () => {
            const handleClick = jest.fn();
            render(
                <TestWrapper>
                    <ButtonLeaderboard onClick={handleClick} showLeaderboard={false} />
                </TestWrapper>
            );
            fireEvent.click(screen.getByRole('button'));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('ButtonMultiplayer', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <ButtonMultiplayer multiplayer={true} onClick={jest.fn()} />
                </TestWrapper>
            );
            expect(document.body).toBeInTheDocument();
        });

        test('renders button element', () => {
            render(
                <TestWrapper>
                    <ButtonMultiplayer multiplayer={true} onClick={jest.fn()} />
                </TestWrapper>
            );
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });

        test('is enabled when multiplayer prop is true', () => {
            render(
                <TestWrapper>
                    <ButtonMultiplayer multiplayer={true} onClick={jest.fn()} />
                </TestWrapper>
            );
            const button = screen.getByRole('button');
            expect(button).not.toBeDisabled();
        });

        test('is disabled when multiplayer prop is false', () => {
            render(
                <TestWrapper>
                    <ButtonMultiplayer multiplayer={false} onClick={jest.fn()} />
                </TestWrapper>
            );
            const button = screen.getByRole('button');
            expect(button).toBeDisabled();
        });

        test('calls onClick when clicked and enabled', () => {
            const handleClick = jest.fn();
            render(
                <TestWrapper>
                    <ButtonMultiplayer multiplayer={true} onClick={handleClick} />
                </TestWrapper>
            );
            fireEvent.click(screen.getByRole('button'));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('ButtonTrainAI', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <ButtonTrainAI onClick={jest.fn()} />
                </TestWrapper>
            );
            expect(document.body).toBeInTheDocument();
        });

        test('renders button element', () => {
            render(
                <TestWrapper>
                    <ButtonTrainAI onClick={jest.fn()} />
                </TestWrapper>
            );
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });

        test('calls onClick when clicked', () => {
            const handleClick = jest.fn();
            render(
                <TestWrapper>
                    <ButtonTrainAI onClick={handleClick} />
                </TestWrapper>
            );
            fireEvent.click(screen.getByRole('button'));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });
});
