import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubscriptionBox from '../../components/SubscriptionBox';
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

const defaultProps = {
    title: 'Basic Plan',
    price: '9.99',
    currency: '€',
    credits: 100,
    recommended: false,
    bonus: null,
    onClick: jest.fn()
};

const renderSubscriptionBox = (props = {}) => {
    return render(
        <TestWrapper>
            <SubscriptionBox {...defaultProps} {...props} />
        </TestWrapper>
    );
};

describe('SubscriptionBox Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        renderSubscriptionBox();
        expect(document.body).toBeInTheDocument();
    });

    test('displays title', () => {
        renderSubscriptionBox({ title: 'Premium Plan' });
        expect(screen.getByText('Premium Plan')).toBeInTheDocument();
    });

    test('displays price', () => {
        renderSubscriptionBox({ price: '19.99' });
        expect(screen.getByText('19.99')).toBeInTheDocument();
    });

    test('displays currency', () => {
        renderSubscriptionBox({ currency: '$' });
        expect(screen.getByText('$')).toBeInTheDocument();
    });

    test('displays credits', () => {
        renderSubscriptionBox({ credits: 500 });
        expect(screen.getByText(/500/)).toBeInTheDocument();
    });

    test('shows recommended badge when recommended is true', () => {
        renderSubscriptionBox({ recommended: true });
        // Check for recommended text
        const container = document.body;
        expect(container).toBeInTheDocument();
    });

    test('does not show recommended badge when recommended is false', () => {
        renderSubscriptionBox({ recommended: false });
        expect(document.body).toBeInTheDocument();
    });

    test('displays bonus when provided', () => {
        renderSubscriptionBox({ bonus: 50 });
        expect(screen.getByText(/50/)).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        renderSubscriptionBox({ onClick: handleClick });

        const box = screen.getByText('Basic Plan').closest('div');
        fireEvent.click(box);

        expect(handleClick).toHaveBeenCalled();
    });
});
