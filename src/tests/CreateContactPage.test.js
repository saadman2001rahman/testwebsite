// CreateContactPage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateContactPage from '../components/CreateContactPage';

const mockOnAddContact = jest.fn();
const mockOnCancelClick = jest.fn();

describe('CreateContactPage Component', () => {
    it('renders the form correctly', () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        expect(screen.getByText('Create Contact')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name (Optional):')).toBeInTheDocument();
        expect(screen.getByText('Create Contact')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name (Optional):'), { target: { value: 'Doe' } });

        expect(screen.getByLabelText('Email:')).toHaveValue('test@example.com');
        expect(screen.getByLabelText('First Name:')).toHaveValue('John');
        expect(screen.getByLabelText('Last Name (Optional):')).toHaveValue('Doe');
    });

    it('calls onAddContact when "Create Contact" button is clicked with valid input', async () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });

        fireEvent.click(screen.getByText('Create Contact'));

        await waitFor(() => {
            expect(mockOnAddContact).toHaveBeenCalledWith({
                email: 'test@example.com',
                firstName: 'John',
                // lastName: '',
            });
        });
    });

    it('calls onCancelClick when "Cancel" button is clicked', () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockOnCancelClick).toHaveBeenCalled();
    });
});
