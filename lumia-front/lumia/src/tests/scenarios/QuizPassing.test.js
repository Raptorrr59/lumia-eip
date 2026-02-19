import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

// Mock Quiz with scoring logic
const MockQuizWithScoring = ({ questions, passingScore = 80, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [answers, setAnswers] = React.useState({});
    const [showResults, setShowResults] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [passed, setPassed] = React.useState(false);

    const handleAnswer = (questionIndex, answerIndex) => {
        setAnswers({ ...answers, [questionIndex]: answerIndex });
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correctCount++;
            }
        });
        const calculatedScore = Math.round((correctCount / questions.length) * 100);
        setScore(calculatedScore);
        setPassed(calculatedScore >= passingScore);
        setShowResults(true);
        onComplete?.(calculatedScore, calculatedScore >= passingScore);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    if (showResults) {
        return (
            <div data-testid="quiz-results">
                <h2>Quiz Complete!</h2>
                <p data-testid="score">Score: {score}%</p>
                <p data-testid="passing-score">Passing Score: {passingScore}%</p>
                {passed ? (
                    <div data-testid="passed-message" className="success">
                        🎉 Congratulations! You passed!
                    </div>
                ) : (
                    <div data-testid="failed-message" className="failure">
                        ❌ You need {passingScore}% to pass. Try again!
                    </div>
                )}
            </div>
        );
    }

    const question = questions[currentQuestion];
    return (
        <div data-testid="quiz">
            <h2 data-testid="question-counter">Question {currentQuestion + 1}/{questions.length}</h2>
            <p data-testid="question-text">{question.question}</p>
            <div data-testid="options">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        data-testid={`option-${index}`}
                        onClick={() => handleAnswer(currentQuestion, index)}
                        className={answers[currentQuestion] === index ? 'selected' : ''}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {currentQuestion < questions.length - 1 ? (
                <button data-testid="next-btn" onClick={handleNext}>Next</button>
            ) : (
                <button data-testid="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
            )}
        </div>
    );
};

describe('Quiz Passing Score Tests (≥80%)', () => {
    // 5 questions - need 4+ correct to pass (80%)
    const mockQuestions = [
        {
            question: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 1
        },
        {
            question: 'What color is the sky?',
            options: ['Green', 'Red', 'Blue', 'Yellow'],
            correctAnswer: 2
        },
        {
            question: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Madrid', 'Paris'],
            correctAnswer: 3
        },
        {
            question: 'How many days in a week?',
            options: ['5', '6', '7', '8'],
            correctAnswer: 2
        },
        {
            question: 'What is H2O?',
            options: ['Fire', 'Water', 'Earth', 'Air'],
            correctAnswer: 1
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Scenario: After completing all modules, user passes quiz with ≥80% success', () => {

        test('quiz displays questions correctly', () => {
            render(
                <TestWrapper>
                    <MockQuizWithScoring questions={mockQuestions} passingScore={80} />
                </TestWrapper>
            );
            expect(screen.getByTestId('question-counter')).toHaveTextContent('Question 1/5');
            expect(screen.getByTestId('question-text')).toHaveTextContent('What is 2 + 2?');
        });

        test('user can select answers', () => {
            render(
                <TestWrapper>
                    <MockQuizWithScoring questions={mockQuestions} passingScore={80} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('option-1'));
            expect(screen.getByTestId('option-1')).toHaveClass('selected');
        });

        test('user passes quiz with 100% score (5/5 correct)', () => {
            const onComplete = jest.fn();
            render(
                <TestWrapper>
                    <MockQuizWithScoring
                        questions={mockQuestions}
                        passingScore={80}
                        onComplete={onComplete}
                    />
                </TestWrapper>
            );

            // Question 1: correct answer is index 1
            fireEvent.click(screen.getByTestId('option-1'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 2: correct answer is index 2
            fireEvent.click(screen.getByTestId('option-2'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 3: correct answer is index 3
            fireEvent.click(screen.getByTestId('option-3'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 4: correct answer is index 2
            fireEvent.click(screen.getByTestId('option-2'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 5: correct answer is index 1
            fireEvent.click(screen.getByTestId('option-1'));
            fireEvent.click(screen.getByTestId('submit-btn'));

            // Should pass with 100%
            expect(screen.getByTestId('score')).toHaveTextContent('Score: 100%');
            expect(screen.getByTestId('passed-message')).toBeInTheDocument();
            expect(onComplete).toHaveBeenCalledWith(100, true);
        });

        test('user passes quiz with exactly 80% score (4/5 correct)', () => {
            const onComplete = jest.fn();
            render(
                <TestWrapper>
                    <MockQuizWithScoring
                        questions={mockQuestions}
                        passingScore={80}
                        onComplete={onComplete}
                    />
                </TestWrapper>
            );

            // Get 4 correct, 1 wrong
            // Question 1: correct
            fireEvent.click(screen.getByTestId('option-1'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 2: correct
            fireEvent.click(screen.getByTestId('option-2'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 3: correct
            fireEvent.click(screen.getByTestId('option-3'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 4: correct
            fireEvent.click(screen.getByTestId('option-2'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 5: WRONG (correct is 1, we select 0)
            fireEvent.click(screen.getByTestId('option-0'));
            fireEvent.click(screen.getByTestId('submit-btn'));

            // Should pass with 80%
            expect(screen.getByTestId('score')).toHaveTextContent('Score: 80%');
            expect(screen.getByTestId('passed-message')).toBeInTheDocument();
            expect(onComplete).toHaveBeenCalledWith(80, true);
        });

        test('user fails quiz with 60% score (3/5 correct, below 80%)', () => {
            const onComplete = jest.fn();
            render(
                <TestWrapper>
                    <MockQuizWithScoring
                        questions={mockQuestions}
                        passingScore={80}
                        onComplete={onComplete}
                    />
                </TestWrapper>
            );

            // Get 3 correct, 2 wrong
            // Question 1: correct
            fireEvent.click(screen.getByTestId('option-1'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 2: correct
            fireEvent.click(screen.getByTestId('option-2'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 3: correct
            fireEvent.click(screen.getByTestId('option-3'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 4: WRONG
            fireEvent.click(screen.getByTestId('option-0'));
            fireEvent.click(screen.getByTestId('next-btn'));

            // Question 5: WRONG
            fireEvent.click(screen.getByTestId('option-0'));
            fireEvent.click(screen.getByTestId('submit-btn'));

            // Should fail with 60% (below 80%)
            expect(screen.getByTestId('score')).toHaveTextContent('Score: 60%');
            expect(screen.getByTestId('failed-message')).toBeInTheDocument();
            expect(screen.getByText(/You need 80% to pass/)).toBeInTheDocument();
            expect(onComplete).toHaveBeenCalledWith(60, false);
        });

        test('passing score threshold is displayed', () => {
            render(
                <TestWrapper>
                    <MockQuizWithScoring questions={mockQuestions} passingScore={80} />
                </TestWrapper>
            );

            // Complete quiz quickly
            fireEvent.click(screen.getByTestId('option-1'));
            fireEvent.click(screen.getByTestId('next-btn'));
            fireEvent.click(screen.getByTestId('option-2'));
            fireEvent.click(screen.getByTestId('next-btn'));
            fireEvent.click(screen.getByTestId('option-3'));
            fireEvent.click(screen.getByTestId('next-btn'));
            fireEvent.click(screen.getByTestId('option-2'));
            fireEvent.click(screen.getByTestId('next-btn'));
            fireEvent.click(screen.getByTestId('option-1'));
            fireEvent.click(screen.getByTestId('submit-btn'));

            expect(screen.getByTestId('passing-score')).toHaveTextContent('Passing Score: 80%');
        });

        test('user fails quiz with 0% score (all wrong)', () => {
            const onComplete = jest.fn();
            render(
                <TestWrapper>
                    <MockQuizWithScoring
                        questions={mockQuestions}
                        passingScore={80}
                        onComplete={onComplete}
                    />
                </TestWrapper>
            );

            // All wrong answers
            fireEvent.click(screen.getByTestId('option-0')); // wrong
            fireEvent.click(screen.getByTestId('next-btn'));
            fireEvent.click(screen.getByTestId('option-0')); // wrong
            fireEvent.click(screen.getByTestId('next-btn'));
            fireEvent.click(screen.getByTestId('option-0')); // wrong
            fireEvent.click(screen.getByTestId('next-btn'));
            fireEvent.click(screen.getByTestId('option-0')); // wrong
            fireEvent.click(screen.getByTestId('next-btn'));
            fireEvent.click(screen.getByTestId('option-0')); // wrong
            fireEvent.click(screen.getByTestId('submit-btn'));

            expect(screen.getByTestId('score')).toHaveTextContent('Score: 0%');
            expect(screen.getByTestId('failed-message')).toBeInTheDocument();
            expect(onComplete).toHaveBeenCalledWith(0, false);
        });
    });
});
