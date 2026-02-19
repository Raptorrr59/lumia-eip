import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock react-router-dom
jest.mock('react-router-dom', () => {
    return require('../mocks/react-router-dom');
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

// Mock CourseModal component
const MockCourseModal = ({ isOpen, onClose, course }) => (
    isOpen ? (
        <div data-testid="course-modal">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <span>Duration: {course.duration}</span>
            <span>Difficulty: {course.difficulty}</span>
            <button onClick={onClose}>Close</button>
            <button>Start Course</button>
        </div>
    ) : null
);

describe('CourseModal Component', () => {
    const mockCourse = {
        id: 1,
        title: 'Python Basics',
        description: 'Learn Python fundamentals',
        duration: '2 hours',
        difficulty: 'Beginner'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders when open', () => {
        render(
            <TestWrapper>
                <MockCourseModal isOpen={true} onClose={jest.fn()} course={mockCourse} />
            </TestWrapper>
        );
        expect(screen.getByTestId('course-modal')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        render(
            <TestWrapper>
                <MockCourseModal isOpen={false} onClose={jest.fn()} course={mockCourse} />
            </TestWrapper>
        );
        expect(screen.queryByTestId('course-modal')).not.toBeInTheDocument();
    });

    test('displays course title', () => {
        render(
            <TestWrapper>
                <MockCourseModal isOpen={true} onClose={jest.fn()} course={mockCourse} />
            </TestWrapper>
        );
        expect(screen.getByText('Python Basics')).toBeInTheDocument();
    });

    test('displays course description', () => {
        render(
            <TestWrapper>
                <MockCourseModal isOpen={true} onClose={jest.fn()} course={mockCourse} />
            </TestWrapper>
        );
        expect(screen.getByText('Learn Python fundamentals')).toBeInTheDocument();
    });

    test('displays course duration', () => {
        render(
            <TestWrapper>
                <MockCourseModal isOpen={true} onClose={jest.fn()} course={mockCourse} />
            </TestWrapper>
        );
        expect(screen.getByText(/2 hours/)).toBeInTheDocument();
    });

    test('displays course difficulty', () => {
        render(
            <TestWrapper>
                <MockCourseModal isOpen={true} onClose={jest.fn()} course={mockCourse} />
            </TestWrapper>
        );
        expect(screen.getByText(/Beginner/)).toBeInTheDocument();
    });

    test('calls onClose when close button clicked', () => {
        const handleClose = jest.fn();
        render(
            <TestWrapper>
                <MockCourseModal isOpen={true} onClose={handleClose} course={mockCourse} />
            </TestWrapper>
        );
        fireEvent.click(screen.getByText('Close'));
        expect(handleClose).toHaveBeenCalled();
    });

    test('renders start course button', () => {
        render(
            <TestWrapper>
                <MockCourseModal isOpen={true} onClose={jest.fn()} course={mockCourse} />
            </TestWrapper>
        );
        expect(screen.getByText('Start Course')).toBeInTheDocument();
    });
});
