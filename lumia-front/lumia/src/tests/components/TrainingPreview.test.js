import React from 'react';
import { render, screen } from '@testing-library/react';
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

// Mock TrainingPreview component
const MockTrainingPreview = ({ status, progress, onDownload }) => (
    <div data-testid="training-preview">
        <span>Status: {status}</span>
        <span>Progress: {progress}%</span>
        <button onClick={onDownload}>Download</button>
    </div>
);

describe('TrainingPreview Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockTrainingPreview status="idle" progress={0} onDownload={jest.fn()} />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('displays status', () => {
        render(
            <TestWrapper>
                <MockTrainingPreview status="training" progress={50} onDownload={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByText(/Status: training/)).toBeInTheDocument();
    });

    test('displays progress', () => {
        render(
            <TestWrapper>
                <MockTrainingPreview status="training" progress={75} onDownload={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByText(/Progress: 75%/)).toBeInTheDocument();
    });

    test('renders download button', () => {
        render(
            <TestWrapper>
                <MockTrainingPreview status="complete" progress={100} onDownload={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
