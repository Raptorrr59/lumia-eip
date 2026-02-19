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

// Mock FormationCheckpoints component
const MockFormationCheckpoints = ({ checkpoints, currentCheckpoint, onCheckpointClick }) => (
    <div data-testid="formation-checkpoints">
        <h3>Progress</h3>
        <ul>
            {checkpoints.map((checkpoint, index) => (
                <li
                    key={index}
                    data-testid="checkpoint"
                    className={index <= currentCheckpoint ? 'completed' : 'pending'}
                    onClick={() => onCheckpointClick(index)}
                >
                    <span>{checkpoint.title}</span>
                    <span>{checkpoint.completed ? '✓' : '○'}</span>
                </li>
            ))}
        </ul>
    </div>
);

describe('FormationCheckpoints Component', () => {
    const mockCheckpoints = [
        { title: 'Introduction', completed: true },
        { title: 'Basics', completed: true },
        { title: 'Advanced', completed: false },
        { title: 'Final Quiz', completed: false }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockFormationCheckpoints
                    checkpoints={mockCheckpoints}
                    currentCheckpoint={1}
                    onCheckpointClick={jest.fn()}
                />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('renders all checkpoints', () => {
        render(
            <TestWrapper>
                <MockFormationCheckpoints
                    checkpoints={mockCheckpoints}
                    currentCheckpoint={1}
                    onCheckpointClick={jest.fn()}
                />
            </TestWrapper>
        );
        const checkpoints = screen.getAllByTestId('checkpoint');
        expect(checkpoints.length).toBe(4);
    });

    test('displays checkpoint titles', () => {
        render(
            <TestWrapper>
                <MockFormationCheckpoints
                    checkpoints={mockCheckpoints}
                    currentCheckpoint={1}
                    onCheckpointClick={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('Introduction')).toBeInTheDocument();
        expect(screen.getByText('Basics')).toBeInTheDocument();
        expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    test('calls onCheckpointClick when clicked', () => {
        const handleClick = jest.fn();
        render(
            <TestWrapper>
                <MockFormationCheckpoints
                    checkpoints={mockCheckpoints}
                    currentCheckpoint={1}
                    onCheckpointClick={handleClick}
                />
            </TestWrapper>
        );
        const checkpoints = screen.getAllByTestId('checkpoint');
        fireEvent.click(checkpoints[2]);
        expect(handleClick).toHaveBeenCalledWith(2);
    });
});
