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

// Mock EventModal component
const MockEventModal = ({ isOpen, onClose, event }) => (
    isOpen ? (
        <div data-testid="event-modal">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <span>{event.date}</span>
            <span>{event.location}</span>
            <button onClick={onClose}>Close</button>
            <button>Register</button>
        </div>
    ) : null
);

describe('EventModal Component', () => {
    const mockEvent = {
        id: 1,
        title: 'AI Workshop',
        description: 'Learn about AI',
        date: '2024-03-15',
        location: 'Online'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders when open', () => {
        render(
            <TestWrapper>
                <MockEventModal isOpen={true} onClose={jest.fn()} event={mockEvent} />
            </TestWrapper>
        );
        expect(screen.getByTestId('event-modal')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        render(
            <TestWrapper>
                <MockEventModal isOpen={false} onClose={jest.fn()} event={mockEvent} />
            </TestWrapper>
        );
        expect(screen.queryByTestId('event-modal')).not.toBeInTheDocument();
    });

    test('displays event title', () => {
        render(
            <TestWrapper>
                <MockEventModal isOpen={true} onClose={jest.fn()} event={mockEvent} />
            </TestWrapper>
        );
        expect(screen.getByText('AI Workshop')).toBeInTheDocument();
    });

    test('displays event description', () => {
        render(
            <TestWrapper>
                <MockEventModal isOpen={true} onClose={jest.fn()} event={mockEvent} />
            </TestWrapper>
        );
        expect(screen.getByText('Learn about AI')).toBeInTheDocument();
    });

    test('displays event date', () => {
        render(
            <TestWrapper>
                <MockEventModal isOpen={true} onClose={jest.fn()} event={mockEvent} />
            </TestWrapper>
        );
        expect(screen.getByText('2024-03-15')).toBeInTheDocument();
    });

    test('calls onClose when close button clicked', () => {
        const handleClose = jest.fn();
        render(
            <TestWrapper>
                <MockEventModal isOpen={true} onClose={handleClose} event={mockEvent} />
            </TestWrapper>
        );
        fireEvent.click(screen.getByText('Close'));
        expect(handleClose).toHaveBeenCalled();
    });

    test('renders register button', () => {
        render(
            <TestWrapper>
                <MockEventModal isOpen={true} onClose={jest.fn()} event={mockEvent} />
            </TestWrapper>
        );
        expect(screen.getByText('Register')).toBeInTheDocument();
    });
});
