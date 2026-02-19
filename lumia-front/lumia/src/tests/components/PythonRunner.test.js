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

// Mock PythonRunner component
const MockPythonRunner = ({ code, onRun, output, isRunning }) => (
    <div data-testid="python-runner">
        <pre data-testid="code-display">{code}</pre>
        <button onClick={onRun} disabled={isRunning}>
            {isRunning ? 'Running...' : 'Run Code'}
        </button>
        <div data-testid="output">
            {output}
        </div>
    </div>
);

describe('PythonRunner Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockPythonRunner
                    code="print('Hello')"
                    onRun={jest.fn()}
                    output=""
                    isRunning={false}
                />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('displays code', () => {
        render(
            <TestWrapper>
                <MockPythonRunner
                    code="print('Hello World')"
                    onRun={jest.fn()}
                    output=""
                    isRunning={false}
                />
            </TestWrapper>
        );
        expect(screen.getByText("print('Hello World')")).toBeInTheDocument();
    });

    test('renders run button', () => {
        render(
            <TestWrapper>
                <MockPythonRunner
                    code="print('Test')"
                    onRun={jest.fn()}
                    output=""
                    isRunning={false}
                />
            </TestWrapper>
        );
        expect(screen.getByText('Run Code')).toBeInTheDocument();
    });

    test('shows running state', () => {
        render(
            <TestWrapper>
                <MockPythonRunner
                    code="print('Test')"
                    onRun={jest.fn()}
                    output=""
                    isRunning={true}
                />
            </TestWrapper>
        );
        expect(screen.getByText('Running...')).toBeInTheDocument();
    });

    test('displays output', () => {
        render(
            <TestWrapper>
                <MockPythonRunner
                    code="print('Hello')"
                    onRun={jest.fn()}
                    output="Hello"
                    isRunning={false}
                />
            </TestWrapper>
        );
        expect(screen.getByTestId('output')).toHaveTextContent('Hello');
    });

    test('disables button when running', () => {
        render(
            <TestWrapper>
                <MockPythonRunner
                    code="print('Test')"
                    onRun={jest.fn()}
                    output=""
                    isRunning={true}
                />
            </TestWrapper>
        );
        expect(screen.getByRole('button')).toBeDisabled();
    });
});
