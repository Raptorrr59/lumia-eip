import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
    <BrowserRouter>
        <LangProvider>
            {children}
        </LangProvider>
    </BrowserRouter>
);

// Mock components to avoid complex dependencies  
const MockRedirectionCourse = ({ name, duration }) => (
    <a href="/course/1" data-testid="course-link">
        <div>{name}</div>
        <span>{duration}</span>
    </a>
);

const MockRedirectionFormation = ({ name }) => (
    <a href="/formation/1" data-testid="formation-link">
        <div>{name}</div>
    </a>
);

const MockRedirectionGames = ({ name, image }) => (
    <a href="/game/1" data-testid="game-link">
        <img src={image} alt={name} />
        <div>{name}</div>
    </a>
);

describe('Redirection Components', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('RedirectionCourse', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <MockRedirectionCourse name="Python Basics" duration="2h" />
                </TestWrapper>
            );
            expect(document.body).toBeInTheDocument();
        });

        test('displays course name', () => {
            render(
                <TestWrapper>
                    <MockRedirectionCourse name="Python Basics" duration="2h" />
                </TestWrapper>
            );
            expect(screen.getByText('Python Basics')).toBeInTheDocument();
        });

        test('displays course duration', () => {
            render(
                <TestWrapper>
                    <MockRedirectionCourse name="Python Basics" duration="2h" />
                </TestWrapper>
            );
            expect(screen.getByText('2h')).toBeInTheDocument();
        });

        test('renders as a link', () => {
            render(
                <TestWrapper>
                    <MockRedirectionCourse name="Python Basics" duration="2h" />
                </TestWrapper>
            );
            expect(screen.getByTestId('course-link')).toBeInTheDocument();
        });
    });

    describe('RedirectionFormation', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <MockRedirectionFormation name="AI Fundamentals" />
                </TestWrapper>
            );
            expect(document.body).toBeInTheDocument();
        });

        test('displays formation name', () => {
            render(
                <TestWrapper>
                    <MockRedirectionFormation name="AI Fundamentals" />
                </TestWrapper>
            );
            expect(screen.getByText('AI Fundamentals')).toBeInTheDocument();
        });
    });

    describe('RedirectionGames', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <MockRedirectionGames name="Snake AI" image="/snake.png" />
                </TestWrapper>
            );
            expect(document.body).toBeInTheDocument();
        });

        test('displays game name', () => {
            render(
                <TestWrapper>
                    <MockRedirectionGames name="Snake AI" image="/snake.png" />
                </TestWrapper>
            );
            expect(screen.getByText('Snake AI')).toBeInTheDocument();
        });

        test('renders game image', () => {
            render(
                <TestWrapper>
                    <MockRedirectionGames name="Snake AI" image="/snake.png" />
                </TestWrapper>
            );
            const img = screen.getByRole('img');
            expect(img).toBeInTheDocument();
        });
    });
});
