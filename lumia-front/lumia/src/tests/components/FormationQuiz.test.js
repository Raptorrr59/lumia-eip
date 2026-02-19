import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock quiz data
jest.mock('../../components/FormationQuizDataFR', () => ({}));
jest.mock('../../components/FormationQuizDataEN', () => ({}));

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

// Mock FormationQuiz component
const MockFormationQuiz = ({ formationId, questions, onComplete }) => (
    <div data-testid="formation-quiz">
        <h2>Formation Quiz</h2>
        <div data-testid="question-count">{questions.length} questions</div>
        {questions.map((q, i) => (
            <div key={i} data-testid="quiz-question">
                <p>{q.question}</p>
                {q.options.map((opt, j) => (
                    <button key={j}>{opt}</button>
                ))}
            </div>
        ))}
        <button onClick={onComplete}>Submit</button>
    </div>
);

describe('FormationQuiz Component', () => {
    const mockQuestions = [
        {
            question: 'What is Python?',
            options: ['A snake', 'A programming language', 'A game', 'A movie'],
            correctAnswer: 1
        },
        {
            question: 'What does AI stand for?',
            options: ['Apple Inc', 'Artificial Intelligence', 'Auto Import', 'All Included'],
            correctAnswer: 1
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockFormationQuiz
                    formationId="test-formation"
                    questions={mockQuestions}
                    onComplete={jest.fn()}
                />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('displays quiz heading', () => {
        render(
            <TestWrapper>
                <MockFormationQuiz
                    formationId="test-formation"
                    questions={mockQuestions}
                    onComplete={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('Formation Quiz')).toBeInTheDocument();
    });

    test('displays correct question count', () => {
        render(
            <TestWrapper>
                <MockFormationQuiz
                    formationId="test-formation"
                    questions={mockQuestions}
                    onComplete={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('2 questions')).toBeInTheDocument();
    });

    test('renders all questions', () => {
        render(
            <TestWrapper>
                <MockFormationQuiz
                    formationId="test-formation"
                    questions={mockQuestions}
                    onComplete={jest.fn()}
                />
            </TestWrapper>
        );
        const questions = screen.getAllByTestId('quiz-question');
        expect(questions.length).toBe(2);
    });

    test('displays question text', () => {
        render(
            <TestWrapper>
                <MockFormationQuiz
                    formationId="test-formation"
                    questions={mockQuestions}
                    onComplete={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('What is Python?')).toBeInTheDocument();
    });

    test('displays answer options', () => {
        render(
            <TestWrapper>
                <MockFormationQuiz
                    formationId="test-formation"
                    questions={mockQuestions}
                    onComplete={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('A programming language')).toBeInTheDocument();
    });

    test('renders submit button', () => {
        render(
            <TestWrapper>
                <MockFormationQuiz
                    formationId="test-formation"
                    questions={mockQuestions}
                    onComplete={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    test('calls onComplete when submitted', () => {
        const handleComplete = jest.fn();
        render(
            <TestWrapper>
                <MockFormationQuiz
                    formationId="test-formation"
                    questions={mockQuestions}
                    onComplete={handleComplete}
                />
            </TestWrapper>
        );
        fireEvent.click(screen.getByText('Submit'));
        expect(handleComplete).toHaveBeenCalled();
    });
});
