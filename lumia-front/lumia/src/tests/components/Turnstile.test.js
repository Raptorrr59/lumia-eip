import React from 'react';
import { render, screen } from '@testing-library/react';
import Turnstile from '../../components/Turnstile';

// Mock window.turnstile
window.turnstile = {
    render: jest.fn(() => 'widget-id'),
    remove: jest.fn()
};

describe('Turnstile Component', () => {
    const defaultProps = {
        siteKey: 'test-site-key',
        onVerify: jest.fn(),
        onError: jest.fn(),
        onExpire: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(<Turnstile {...defaultProps} />);
        expect(document.body).toBeInTheDocument();
    });

    test('renders container div', () => {
        const { container } = render(<Turnstile {...defaultProps} />);
        expect(container.querySelector('div')).toBeInTheDocument();
    });

    test('calls turnstile.render on mount', () => {
        render(<Turnstile {...defaultProps} />);
        expect(window.turnstile.render).toHaveBeenCalled();
    });

    test('passes correct sitekey to turnstile', () => {
        render(<Turnstile {...defaultProps} />);
        expect(window.turnstile.render).toHaveBeenCalledWith(
            expect.any(HTMLElement),
            expect.objectContaining({ sitekey: 'test-site-key' })
        );
    });

    test('cleans up widget on unmount', () => {
        const { unmount } = render(<Turnstile {...defaultProps} />);
        unmount();
        expect(window.turnstile.remove).toHaveBeenCalledWith('widget-id');
    });
});
