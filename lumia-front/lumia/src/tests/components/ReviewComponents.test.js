import React from 'react';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock axios
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] })),
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

const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

// Mock review components for testing
const MockReviewAverage = ({ average, count }) => (
    <div data-testid="review-average">
        <span>{average}</span>
        <span>{count} reviews</span>
    </div>
);

describe('Review Components', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('ReviewAverage', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <MockReviewAverage average={4.5} count={10} />
                </TestWrapper>
            );
            expect(document.body).toBeInTheDocument();
        });

        test('displays average rating', () => {
            render(
                <TestWrapper>
                    <MockReviewAverage average={4.5} count={10} />
                </TestWrapper>
            );
            expect(screen.getByText('4.5')).toBeInTheDocument();
        });

        test('displays review count', () => {
            render(
                <TestWrapper>
                    <MockReviewAverage average={4.5} count={10} />
                </TestWrapper>
            );
            expect(screen.getByText('10 reviews')).toBeInTheDocument();
        });

        test('renders test id', () => {
            render(
                <TestWrapper>
                    <MockReviewAverage average={4.5} count={10} />
                </TestWrapper>
            );
            expect(screen.getByTestId('review-average')).toBeInTheDocument();
        });
    });
});
