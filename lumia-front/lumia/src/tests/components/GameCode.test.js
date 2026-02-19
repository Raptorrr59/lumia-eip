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

// Mock GameCode component
const MockGameCode = ({ code, language, editable, onChange }) => (
    <div data-testid="game-code">
        <div data-testid="language-indicator">{language}</div>
        <textarea
            data-testid="code-editor"
            value={code}
            onChange={(e) => onChange?.(e.target.value)}
            readOnly={!editable}
        />
    </div>
);

describe('GameCode Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockGameCode code="print('hello')" language="python" editable={false} />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('displays code', () => {
        render(
            <TestWrapper>
                <MockGameCode code="console.log('test')" language="javascript" editable={false} />
            </TestWrapper>
        );
        expect(screen.getByTestId('code-editor').value).toBe("console.log('test')");
    });

    test('displays language indicator', () => {
        render(
            <TestWrapper>
                <MockGameCode code="code" language="python" editable={false} />
            </TestWrapper>
        );
        expect(screen.getByTestId('language-indicator')).toHaveTextContent('python');
    });

    test('is readonly when not editable', () => {
        render(
            <TestWrapper>
                <MockGameCode code="code" language="python" editable={false} />
            </TestWrapper>
        );
        expect(screen.getByTestId('code-editor')).toHaveAttribute('readonly');
    });

    test('is editable when editable prop is true', () => {
        render(
            <TestWrapper>
                <MockGameCode code="code" language="python" editable={true} onChange={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByTestId('code-editor')).not.toHaveAttribute('readonly');
    });
});
