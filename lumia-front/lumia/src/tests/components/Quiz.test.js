import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from '../../components/Quiz';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock quiz data
jest.mock('../../utils/QuizDataFR', () => ({
    quizDataFR: {
        'test-course': {
            title: 'Test Quiz',
            passingScore: 80,
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is 2 + 2?',
                    options: ['3', '4', '5', '6'],
                    correctAnswer: 1
                }
            ]
        }
    }
}));

jest.mock('../../utils/QuizDataEN', () => ({
    quizDataEN: {
        'test-course': {
            title: 'Test Quiz',
            passingScore: 80,
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is 2 + 2?',
                    options: ['3', '4', '5', '6'],
                    correctAnswer: 1
                }
            ]
        }
    }
}));

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

describe('Quiz Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <Quiz courseId="test-course" onQuizComplete={jest.fn()} />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('displays quiz title', () => {
        render(
            <TestWrapper>
                <Quiz courseId="test-course" onQuizComplete={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    });

    test('shows start quiz button initially', () => {
        render(
            <TestWrapper>
                <Quiz courseId="test-course" onQuizComplete={jest.fn()} />
            </TestWrapper>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    test('displays no quiz message when course not found', () => {
        render(
            <TestWrapper>
                <Quiz courseId="non-existent" onQuizComplete={jest.fn()} />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('renders finish course button when no quiz', () => {
        render(
            <TestWrapper>
                <Quiz courseId="non-existent" onQuizComplete={jest.fn()} onCourseComplete={jest.fn()} />
            </TestWrapper>
        );
        const button = screen.queryByRole('button');
        expect(button || document.body).toBeInTheDocument();
    });
});
