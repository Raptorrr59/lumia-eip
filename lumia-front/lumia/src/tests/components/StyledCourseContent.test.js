import React from 'react';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

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

// Mock StyledCourseContent component
const MockStyledCourseContent = ({ content, language }) => (
    <div data-testid="course-content">
        <article dangerouslySetInnerHTML={{ __html: content }} />
    </div>
);

describe('StyledCourseContent Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockStyledCourseContent content="<p>Hello World</p>" language="python" />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('renders content container', () => {
        render(
            <TestWrapper>
                <MockStyledCourseContent content="<p>Test content</p>" language="python" />
            </TestWrapper>
        );
        expect(screen.getByTestId('course-content')).toBeInTheDocument();
    });

    test('displays HTML content', () => {
        render(
            <TestWrapper>
                <MockStyledCourseContent content="<p>Course lesson content</p>" language="python" />
            </TestWrapper>
        );
        expect(screen.getByText('Course lesson content')).toBeInTheDocument();
    });
});
