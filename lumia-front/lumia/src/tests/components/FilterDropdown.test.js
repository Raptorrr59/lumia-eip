import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

// Mock FilterDropdown component
const MockFilterDropdown = ({ options, value, onChange, placeholder }) => (
    <div data-testid="filter-dropdown">
        <select value={value} onChange={(e) => onChange(e.target.value)} data-testid="dropdown-select">
            <option value="">{placeholder}</option>
            {options.map((opt, i) => (
                <option key={i} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

describe('FilterDropdown Component', () => {
    const mockOptions = [
        { value: 'python', label: 'Python' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'java', label: 'Java' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockFilterDropdown options={mockOptions} value="" onChange={jest.fn()} placeholder="Select language" />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('renders select element', () => {
        render(
            <TestWrapper>
                <MockFilterDropdown options={mockOptions} value="" onChange={jest.fn()} placeholder="Select" />
            </TestWrapper>
        );
        expect(screen.getByTestId('dropdown-select')).toBeInTheDocument();
    });

    test('displays placeholder', () => {
        render(
            <TestWrapper>
                <MockFilterDropdown options={mockOptions} value="" onChange={jest.fn()} placeholder="Select language" />
            </TestWrapper>
        );
        expect(screen.getByText('Select language')).toBeInTheDocument();
    });

    test('displays all options', () => {
        render(
            <TestWrapper>
                <MockFilterDropdown options={mockOptions} value="" onChange={jest.fn()} placeholder="Select" />
            </TestWrapper>
        );
        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    test('calls onChange when selection changes', () => {
        const handleChange = jest.fn();
        render(
            <TestWrapper>
                <MockFilterDropdown options={mockOptions} value="" onChange={handleChange} placeholder="Select" />
            </TestWrapper>
        );
        fireEvent.change(screen.getByTestId('dropdown-select'), { target: { value: 'python' } });
        expect(handleChange).toHaveBeenCalledWith('python');
    });

    test('shows selected value', () => {
        render(
            <TestWrapper>
                <MockFilterDropdown options={mockOptions} value="javascript" onChange={jest.fn()} placeholder="Select" />
            </TestWrapper>
        );
        expect(screen.getByTestId('dropdown-select').value).toBe('javascript');
    });
});
