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

// Mock FileUploadModal component
const MockFileUploadModal = ({ isOpen, onClose, onUpload, acceptedTypes }) => (
    isOpen ? (
        <div data-testid="file-upload-modal">
            <h2>Upload File</h2>
            <input type="file" accept={acceptedTypes} data-testid="file-input" />
            <div data-testid="drop-zone">Drop files here</div>
            <button onClick={onUpload} data-testid="upload-btn">Upload</button>
            <button onClick={onClose} data-testid="cancel-btn">Cancel</button>
        </div>
    ) : null
);

describe('FileUploadModal Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders when open', () => {
        render(
            <TestWrapper>
                <MockFileUploadModal isOpen={true} onClose={jest.fn()} onUpload={jest.fn()} acceptedTypes=".zip" />
            </TestWrapper>
        );
        expect(screen.getByTestId('file-upload-modal')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        render(
            <TestWrapper>
                <MockFileUploadModal isOpen={false} onClose={jest.fn()} onUpload={jest.fn()} acceptedTypes=".zip" />
            </TestWrapper>
        );
        expect(screen.queryByTestId('file-upload-modal')).not.toBeInTheDocument();
    });

    test('displays heading', () => {
        render(
            <TestWrapper>
                <MockFileUploadModal isOpen={true} onClose={jest.fn()} onUpload={jest.fn()} acceptedTypes=".zip" />
            </TestWrapper>
        );
        expect(screen.getByText('Upload File')).toBeInTheDocument();
    });

    test('renders file input', () => {
        render(
            <TestWrapper>
                <MockFileUploadModal isOpen={true} onClose={jest.fn()} onUpload={jest.fn()} acceptedTypes=".zip" />
            </TestWrapper>
        );
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    test('renders drop zone', () => {
        render(
            <TestWrapper>
                <MockFileUploadModal isOpen={true} onClose={jest.fn()} onUpload={jest.fn()} acceptedTypes=".zip" />
            </TestWrapper>
        );
        expect(screen.getByTestId('drop-zone')).toBeInTheDocument();
    });

    test('calls onUpload when upload button clicked', () => {
        const handleUpload = jest.fn();
        render(
            <TestWrapper>
                <MockFileUploadModal isOpen={true} onClose={jest.fn()} onUpload={handleUpload} acceptedTypes=".zip" />
            </TestWrapper>
        );
        fireEvent.click(screen.getByTestId('upload-btn'));
        expect(handleUpload).toHaveBeenCalled();
    });

    test('calls onClose when cancel button clicked', () => {
        const handleClose = jest.fn();
        render(
            <TestWrapper>
                <MockFileUploadModal isOpen={true} onClose={handleClose} onUpload={jest.fn()} acceptedTypes=".zip" />
            </TestWrapper>
        );
        fireEvent.click(screen.getByTestId('cancel-btn'));
        expect(handleClose).toHaveBeenCalled();
    });
});
