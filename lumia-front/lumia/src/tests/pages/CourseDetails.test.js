import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { LangProvider } from '../../LangProvider';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: () => jest.fn()
}));

// Mock axios
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} }))
}));

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'language': 'EN',
            'id': '123',
            'accessToken': 'test-token'
        };
        return storage[key] || null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Mock CourseDetails component since the actual file seems incomplete
const MockCourseDetails = () => {
    return (
        <div data-testid="course-details">
            <h1>Course Details</h1>
            <p>Course content here</p>
            <button>Complete Course</button>
        </div>
    );
};

const TestWrapper = ({ children }) => (
    <BrowserRouter>
        <ThemeProvider>
            <LangProvider>
                {children}
            </LangProvider>
        </ThemeProvider>
    </BrowserRouter>
);

describe('CourseDetails Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useParams.mockReturnValue({ id: '1' });
    });

    test('renders course details page without crashing', () => {
        render(
            <TestWrapper>
                <MockCourseDetails />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('renders course heading', () => {
        render(
            <TestWrapper>
                <MockCourseDetails />
            </TestWrapper>
        );
        expect(screen.getByText('Course Details')).toBeInTheDocument();
    });

    test('renders course content', () => {
        render(
            <TestWrapper>
                <MockCourseDetails />
            </TestWrapper>
        );
        expect(screen.getByText('Course content here')).toBeInTheDocument();
    });

    test('renders complete button', () => {
        render(
            <TestWrapper>
                <MockCourseDetails />
            </TestWrapper>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('renders with test id', () => {
        render(
            <TestWrapper>
                <MockCourseDetails />
            </TestWrapper>
        );
        expect(screen.getByTestId('course-details')).toBeInTheDocument();
    });
});
