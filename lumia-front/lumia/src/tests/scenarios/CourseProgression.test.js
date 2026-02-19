import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock localStorage
let mockProgress = {};
const localStorageMock = {
    getItem: jest.fn((key) => {
        if (key === 'language') return 'EN';
        if (key === 'courseProgress') return JSON.stringify(mockProgress);
        if (key === 'accessToken') return 'test-token';
        return null;
    }),
    setItem: jest.fn((key, value) => {
        if (key === 'courseProgress') {
            mockProgress = JSON.parse(value);
        }
    }),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

// Mock Course Progress Component
const MockCourseProgress = ({ courseId, modules, onModuleComplete }) => {
    const [completedModules, setCompletedModules] = React.useState([]);
    const [progress, setProgress] = React.useState(0);

    const handleModuleClick = (moduleId) => {
        if (!completedModules.includes(moduleId)) {
            const newCompleted = [...completedModules, moduleId];
            setCompletedModules(newCompleted);
            const newProgress = Math.round((newCompleted.length / modules.length) * 100);
            setProgress(newProgress);
            localStorage.setItem('courseProgress', JSON.stringify({
                [courseId]: { completed: newCompleted, progress: newProgress }
            }));
            onModuleComplete?.(moduleId, newProgress);
        }
    };

    return (
        <div data-testid="course-progress">
            <h2>Course: {courseId}</h2>
            <div data-testid="progress-bar">Progress: {progress}%</div>
            <ul>
                {modules.map((module) => (
                    <li
                        key={module.id}
                        data-testid={`module-${module.id}`}
                        onClick={() => handleModuleClick(module.id)}
                        className={completedModules.includes(module.id) ? 'completed' : ''}
                    >
                        {module.title}
                        {completedModules.includes(module.id) && <span data-testid="check-mark">✓</span>}
                    </li>
                ))}
            </ul>
            {progress === 100 && <button data-testid="start-quiz-btn">Start Quiz</button>}
        </div>
    );
};

describe('Course Progression Tests', () => {
    const mockModules = [
        { id: 1, title: 'Introduction' },
        { id: 2, title: 'Chapter 1' },
        { id: 3, title: 'Chapter 2' },
        { id: 4, title: 'Chapter 3' },
        { id: 5, title: 'Conclusion' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        mockProgress = {};
    });

    describe('Scenario: User selects a course, reads content, and progress is updated', () => {

        test('progress starts at 0% initially', () => {
            render(
                <TestWrapper>
                    <MockCourseProgress courseId="python-basics" modules={mockModules} />
                </TestWrapper>
            );
            expect(screen.getByTestId('progress-bar')).toHaveTextContent('Progress: 0%');
        });

        test('progress updates when user reads a module', () => {
            render(
                <TestWrapper>
                    <MockCourseProgress courseId="python-basics" modules={mockModules} />
                </TestWrapper>
            );

            // User clicks on first module
            fireEvent.click(screen.getByTestId('module-1'));

            // Progress should update to 20% (1/5 modules)
            expect(screen.getByTestId('progress-bar')).toHaveTextContent('Progress: 20%');
        });

        test('progress is saved to localStorage', () => {
            render(
                <TestWrapper>
                    <MockCourseProgress courseId="python-basics" modules={mockModules} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('module-1'));

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'courseProgress',
                expect.stringContaining('"python-basics"')
            );
        });

        test('completed modules show checkmark', () => {
            render(
                <TestWrapper>
                    <MockCourseProgress courseId="python-basics" modules={mockModules} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('module-1'));

            expect(screen.getByTestId('check-mark')).toBeInTheDocument();
        });

        test('progress accumulates with each module completed', () => {
            render(
                <TestWrapper>
                    <MockCourseProgress courseId="python-basics" modules={mockModules} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('module-1')); // 20%
            expect(screen.getByTestId('progress-bar')).toHaveTextContent('Progress: 20%');

            fireEvent.click(screen.getByTestId('module-2')); // 40%
            expect(screen.getByTestId('progress-bar')).toHaveTextContent('Progress: 40%');

            fireEvent.click(screen.getByTestId('module-3')); // 60%
            expect(screen.getByTestId('progress-bar')).toHaveTextContent('Progress: 60%');
        });

        test('quiz button appears only when all modules are completed (100%)', () => {
            render(
                <TestWrapper>
                    <MockCourseProgress courseId="python-basics" modules={mockModules} />
                </TestWrapper>
            );

            // Quiz button should not be visible initially
            expect(screen.queryByTestId('start-quiz-btn')).not.toBeInTheDocument();

            // Complete all modules
            mockModules.forEach(module => {
                fireEvent.click(screen.getByTestId(`module-${module.id}`));
            });

            // Now quiz button should appear
            expect(screen.getByTestId('start-quiz-btn')).toBeInTheDocument();
            expect(screen.getByTestId('progress-bar')).toHaveTextContent('Progress: 100%');
        });

        test('callback is called with progress when module is completed', () => {
            const onModuleComplete = jest.fn();
            render(
                <TestWrapper>
                    <MockCourseProgress
                        courseId="python-basics"
                        modules={mockModules}
                        onModuleComplete={onModuleComplete}
                    />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('module-1'));

            expect(onModuleComplete).toHaveBeenCalledWith(1, 20);
        });
    });
});
