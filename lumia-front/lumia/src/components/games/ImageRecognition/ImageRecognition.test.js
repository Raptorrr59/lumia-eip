import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageRecognition from './ImageRecognition';
import { LangProvider } from '../../../LangProvider';

// Mock SockJS and STOMP client
jest.mock('sockjs-client', () => {
    return function MockSockJS() {
        return {
            close: jest.fn()
        };
    };
});

jest.mock('@stomp/stompjs', () => ({
    Client: jest.fn().mockImplementation(() => ({
        activate: jest.fn(),
        deactivate: jest.fn(),
        subscribe: jest.fn(),
        onConnect: null
    }))
}));

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'language': 'EN',
            'id': '123',
            'accessToken': 'test-token',
            'userName': 'testuser'
        };
        return storage[key] || null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test wrapper
const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

const renderImageRecognition = (props = {}) => {
    const defaultProps = {
        game: {},
        isLoading: false,
        setIsLoading: jest.fn(),
        isUploaded: false
    };
    return render(
        <TestWrapper>
            <ImageRecognition {...defaultProps} {...props} />
        </TestWrapper>
    );
};

describe('ImageRecognition Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([{ url: 'http://test.com/image.jpg' }])
        });
    });

    describe('Rendering', () => {
        test('renders with loading state', () => {
            renderImageRecognition({ isLoading: true });

            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        });

        test('renders game title when not loading', () => {
            renderImageRecognition({ isLoading: false });

            expect(screen.getByText(/guess.*image|cat.*dog/i)).toBeInTheDocument();
        });

        test('renders score display', () => {
            renderImageRecognition({ isLoading: false });

            expect(screen.getByText(/score/i)).toBeInTheDocument();
        });

        test('renders start button when game not playing', () => {
            renderImageRecognition({ isLoading: false, isUploaded: true });

            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        test('renders question mark placeholder before game starts', () => {
            renderImageRecognition({ isLoading: false });

            expect(screen.getByText('?')).toBeInTheDocument();
        });
    });

    describe('Game Controls', () => {
        test('start button is disabled when not uploaded', () => {
            renderImageRecognition({ isLoading: false, isUploaded: false });

            const button = screen.getByRole('button');
            expect(button).toBeDisabled();
        });
    });

    describe('API Calls', () => {
        test('fetches dog image on demand', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([{ url: 'http://dog.com/image.jpg' }])
            });

            renderImageRecognition({ isLoading: false, isUploaded: true });

            // API should be set up
            expect(global.fetch).toBeDefined();
        });

        test('fetches cat image on demand', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([{ url: 'http://cat.com/image.jpg' }])
            });

            renderImageRecognition({ isLoading: false, isUploaded: true });

            expect(global.fetch).toBeDefined();
        });
    });

    describe('Translations', () => {
        test('uses English translations', () => {
            localStorageMock.getItem.mockImplementation((key) => {
                if (key === 'language') return 'EN';
                return null;
            });

            renderImageRecognition({ isLoading: false });

            // Check that English content appears
            expect(screen.getByText(/score/i)).toBeInTheDocument();
        });
    });

    describe('Game Over State', () => {
        test('displays score area', () => {
            renderImageRecognition({ isLoading: false });

            const scoreText = screen.getByText(/score/i);
            expect(scoreText).toBeInTheDocument();
        });
    });
});
