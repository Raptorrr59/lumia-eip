import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewReview from './ReviewReview';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }, ref) => (
        <div ref={ref} {...props}>{children}</div>
      ))
    }
  };
});

describe('ReviewReview Component', () => {
  test('renders pseudo correctly', () => {
    render(<ReviewReview pseudo="JaneDoe" rating={4} review="Great game!" date="01/01/2025" picture="/test.jpg" />);
    expect(screen.getByText('JaneDoe')).toBeInTheDocument();
  });

  test('renders star rating', () => {
    render(<ReviewReview pseudo="JaneDoe" rating={4} review="Great game!" date="01/01/2025" picture="/test.jpg" />);
    expect(screen.getAllByText('★').length).toBe(5);
  });

  test('renders review text with quotes', () => {
    render(<ReviewReview pseudo="JaneDoe" rating={4} review="Great game!" date="01/01/2025" picture="/test.jpg" />);
    expect(screen.getByText('"Great game!"')).toBeInTheDocument();
  });

  test('renders date', () => {
    render(<ReviewReview pseudo="JaneDoe" rating={4} review="Great game!" date="01/01/2025" picture="/test.jpg" />);
    expect(screen.getByText('01/01/2025')).toBeInTheDocument();
  });

  test('renders profile image', () => {
    render(<ReviewReview pseudo="JaneDoe" rating={4} review="Great game!" date="01/01/2025" picture="/test.jpg" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
  });
});
