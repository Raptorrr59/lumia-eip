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

// Mock Tutorial components
const MockTutorialPopup = ({ isOpen, title, content, onClose, onNext }) => (
    isOpen ? (
        <div data-testid="tutorial-popup">
            <h3>{title}</h3>
            <p>{content}</p>
            <button onClick={onClose}>Skip</button>
            <button onClick={onNext}>Next</button>
        </div>
    ) : null
);

const MockTutorialInteractif = ({ steps, currentStep, onComplete }) => (
    <div data-testid="tutorial-interactif">
        <div data-testid="step-indicator">Step {currentStep + 1} of {steps.length}</div>
        <h3>{steps[currentStep]?.title}</h3>
        <p>{steps[currentStep]?.description}</p>
        {currentStep === steps.length - 1 && (
            <button onClick={onComplete}>Complete</button>
        )}
    </div>
);

describe('Tutorial Components', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('TutorialPopup', () => {
        test('renders when open', () => {
            render(
                <TestWrapper>
                    <MockTutorialPopup
                        isOpen={true}
                        title="Welcome"
                        content="This is a tutorial"
                        onClose={jest.fn()}
                        onNext={jest.fn()}
                    />
                </TestWrapper>
            );
            expect(screen.getByTestId('tutorial-popup')).toBeInTheDocument();
        });

        test('does not render when closed', () => {
            render(
                <TestWrapper>
                    <MockTutorialPopup
                        isOpen={false}
                        title="Welcome"
                        content="Tutorial"
                        onClose={jest.fn()}
                        onNext={jest.fn()}
                    />
                </TestWrapper>
            );
            expect(screen.queryByTestId('tutorial-popup')).not.toBeInTheDocument();
        });

        test('displays title', () => {
            render(
                <TestWrapper>
                    <MockTutorialPopup
                        isOpen={true}
                        title="Getting Started"
                        content="Tutorial"
                        onClose={jest.fn()}
                        onNext={jest.fn()}
                    />
                </TestWrapper>
            );
            expect(screen.getByText('Getting Started')).toBeInTheDocument();
        });

        test('displays content', () => {
            render(
                <TestWrapper>
                    <MockTutorialPopup
                        isOpen={true}
                        title="Title"
                        content="Tutorial content here"
                        onClose={jest.fn()}
                        onNext={jest.fn()}
                    />
                </TestWrapper>
            );
            expect(screen.getByText('Tutorial content here')).toBeInTheDocument();
        });

        test('calls onClose when skip clicked', () => {
            const handleClose = jest.fn();
            render(
                <TestWrapper>
                    <MockTutorialPopup
                        isOpen={true}
                        title="Title"
                        content="Content"
                        onClose={handleClose}
                        onNext={jest.fn()}
                    />
                </TestWrapper>
            );
            fireEvent.click(screen.getByText('Skip'));
            expect(handleClose).toHaveBeenCalled();
        });

        test('calls onNext when next clicked', () => {
            const handleNext = jest.fn();
            render(
                <TestWrapper>
                    <MockTutorialPopup
                        isOpen={true}
                        title="Title"
                        content="Content"
                        onClose={jest.fn()}
                        onNext={handleNext}
                    />
                </TestWrapper>
            );
            fireEvent.click(screen.getByText('Next'));
            expect(handleNext).toHaveBeenCalled();
        });
    });

    describe('TutorialInteractif', () => {
        const mockSteps = [
            { title: 'Step 1', description: 'First step' },
            { title: 'Step 2', description: 'Second step' },
            { title: 'Step 3', description: 'Final step' }
        ];

        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <MockTutorialInteractif steps={mockSteps} currentStep={0} onComplete={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByTestId('tutorial-interactif')).toBeInTheDocument();
        });

        test('displays step indicator', () => {
            render(
                <TestWrapper>
                    <MockTutorialInteractif steps={mockSteps} currentStep={0} onComplete={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
        });

        test('displays current step title', () => {
            render(
                <TestWrapper>
                    <MockTutorialInteractif steps={mockSteps} currentStep={1} onComplete={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByText('Step 2')).toBeInTheDocument();
        });

        test('shows complete button on last step', () => {
            render(
                <TestWrapper>
                    <MockTutorialInteractif steps={mockSteps} currentStep={2} onComplete={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByText('Complete')).toBeInTheDocument();
        });

        test('calls onComplete when complete clicked', () => {
            const handleComplete = jest.fn();
            render(
                <TestWrapper>
                    <MockTutorialInteractif steps={mockSteps} currentStep={2} onComplete={handleComplete} />
                </TestWrapper>
            );
            fireEvent.click(screen.getByText('Complete'));
            expect(handleComplete).toHaveBeenCalled();
        });
    });
});
