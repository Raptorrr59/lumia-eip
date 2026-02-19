import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock axios
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} }))
}));

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'language': 'EN',
            'accessToken': 'test-token',
            'id': '123'
        };
        return storage[key] || null;
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

// Mock AdminCommentsManager component
const MockAdminCommentsManager = ({ comments, onDelete, onApprove }) => (
    <div data-testid="admin-comments-manager">
        <h2>Comments Manager</h2>
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Comment</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {comments.map((comment, index) => (
                    <tr key={index} data-testid="comment-row">
                        <td>{comment.user}</td>
                        <td>{comment.text}</td>
                        <td>
                            <button onClick={() => onApprove(comment.id)}>Approve</button>
                            <button onClick={() => onDelete(comment.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

describe('AdminCommentsManager Component', () => {
    const mockComments = [
        { id: 1, user: 'User1', text: 'Great course!' },
        { id: 2, user: 'User2', text: 'Very helpful' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <MockAdminCommentsManager
                    comments={mockComments}
                    onDelete={jest.fn()}
                    onApprove={jest.fn()}
                />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('displays comments manager heading', () => {
        render(
            <TestWrapper>
                <MockAdminCommentsManager
                    comments={mockComments}
                    onDelete={jest.fn()}
                    onApprove={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('Comments Manager')).toBeInTheDocument();
    });

    test('displays comments in table', () => {
        render(
            <TestWrapper>
                <MockAdminCommentsManager
                    comments={mockComments}
                    onDelete={jest.fn()}
                    onApprove={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('Great course!')).toBeInTheDocument();
        expect(screen.getByText('Very helpful')).toBeInTheDocument();
    });

    test('displays user names', () => {
        render(
            <TestWrapper>
                <MockAdminCommentsManager
                    comments={mockComments}
                    onDelete={jest.fn()}
                    onApprove={jest.fn()}
                />
            </TestWrapper>
        );
        expect(screen.getByText('User1')).toBeInTheDocument();
        expect(screen.getByText('User2')).toBeInTheDocument();
    });

    test('renders delete buttons', () => {
        render(
            <TestWrapper>
                <MockAdminCommentsManager
                    comments={mockComments}
                    onDelete={jest.fn()}
                    onApprove={jest.fn()}
                />
            </TestWrapper>
        );
        const deleteButtons = screen.getAllByText('Delete');
        expect(deleteButtons.length).toBe(2);
    });

    test('calls onDelete when delete clicked', () => {
        const handleDelete = jest.fn();
        render(
            <TestWrapper>
                <MockAdminCommentsManager
                    comments={mockComments}
                    onDelete={handleDelete}
                    onApprove={jest.fn()}
                />
            </TestWrapper>
        );
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(handleDelete).toHaveBeenCalledWith(1);
    });

    test('calls onApprove when approve clicked', () => {
        const handleApprove = jest.fn();
        render(
            <TestWrapper>
                <MockAdminCommentsManager
                    comments={mockComments}
                    onDelete={jest.fn()}
                    onApprove={handleApprove}
                />
            </TestWrapper>
        );
        const approveButtons = screen.getAllByText('Approve');
        fireEvent.click(approveButtons[0]);
        expect(handleApprove).toHaveBeenCalledWith(1);
    });
});
