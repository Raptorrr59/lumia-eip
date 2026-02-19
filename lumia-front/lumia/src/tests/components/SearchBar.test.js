import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar Component', () => {
    const defaultProps = {
        searchTerm: '',
        onChange: jest.fn(),
        placeholder: 'Search...'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(<SearchBar {...defaultProps} />);
        expect(document.body).toBeInTheDocument();
    });

    test('renders input element', () => {
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    test('displays placeholder text', () => {
        render(<SearchBar {...defaultProps} placeholder="Rechercher..." />);
        const input = screen.getByPlaceholderText('Rechercher...');
        expect(input).toBeInTheDocument();
    });

    test('displays current search term', () => {
        render(<SearchBar {...defaultProps} searchTerm="test query" />);
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('test query');
    });

    test('calls onChange when typing', () => {
        const handleChange = jest.fn();
        render(<SearchBar {...defaultProps} onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'new search' } });

        expect(handleChange).toHaveBeenCalled();
    });

    test('input has correct type', () => {
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('type', 'text');
    });
});
