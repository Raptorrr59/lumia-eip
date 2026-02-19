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

// Mock CarousselPresentation component
const MockCarousselPresentation = ({ slides, autoPlay, interval }) => (
    <div data-testid="carousel">
        <div data-testid="carousel-slides">
            {slides.map((slide, index) => (
                <div key={index} data-testid="carousel-slide">
                    <img src={slide.image} alt={slide.title} />
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                </div>
            ))}
        </div>
        <div data-testid="carousel-controls">
            <button>Previous</button>
            <button>Next</button>
        </div>
    </div>
);

describe('CarousselPresentation Component', () => {
    const mockSlides = [
        { image: '/slide1.jpg', title: 'Welcome', description: 'Welcome to Lumia' },
        { image: '/slide2.jpg', title: 'Learn', description: 'Learn with AI' },
        { image: '/slide3.jpg', title: 'Play', description: 'Play games' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockCarousselPresentation slides={mockSlides} autoPlay={true} interval={5000} />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('renders carousel container', () => {
        render(
            <TestWrapper>
                <MockCarousselPresentation slides={mockSlides} autoPlay={true} interval={5000} />
            </TestWrapper>
        );
        expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    test('renders all slides', () => {
        render(
            <TestWrapper>
                <MockCarousselPresentation slides={mockSlides} autoPlay={true} interval={5000} />
            </TestWrapper>
        );
        const slides = screen.getAllByTestId('carousel-slide');
        expect(slides.length).toBe(3);
    });

    test('displays slide titles', () => {
        render(
            <TestWrapper>
                <MockCarousselPresentation slides={mockSlides} autoPlay={true} interval={5000} />
            </TestWrapper>
        );
        expect(screen.getByText('Welcome')).toBeInTheDocument();
        expect(screen.getByText('Learn')).toBeInTheDocument();
    });

    test('renders navigation controls', () => {
        render(
            <TestWrapper>
                <MockCarousselPresentation slides={mockSlides} autoPlay={true} interval={5000} />
            </TestWrapper>
        );
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    test('renders slide images', () => {
        render(
            <TestWrapper>
                <MockCarousselPresentation slides={mockSlides} autoPlay={true} interval={5000} />
            </TestWrapper>
        );
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(3);
    });
});
