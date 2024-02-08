// EditContactPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditContactPage from '../components/EditContactPage';

const mockContact = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
};

const mockOnUpdateContact = jest.fn();
const mockOnCancelClick = jest.fn();

describe('EditContactPage Component', () => {
    it('renders form elements correctly', () => {
        render(<EditContactPage contact={mockContact} onUpdateContact={mockOnUpdateContact} onCancelClick={mockOnCancelClick} />);

        expect(screen.getByText(`${mockContact.email}`)).toBeInTheDocument();
        expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name (Optional):')).toBeInTheDocument();
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    // it('calls the correct function when "Save Changes" button is clicked', () => {
    //     render(<EditContactPage contact={mockContact} onUpdateContact={mockOnUpdateContact} onCancelClick={mockOnCancelClick} />);

    //     fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'UpdatedName' } });
    //     fireEvent.click(screen.getByText('Save Changes'));

    //     // Check if the onUpdateContact function is called with the correct edited contact data
    //     expect(mockOnUpdateContact).toHaveBeenCalledWith({
    //         email: 'test@example.com',
    //         firstName: 'UpdatedName',
    //         lastName: 'Doe',
    //     });
    // });

    it('calls the correct function when "Cancel" button is clicked', () => {
        render(<EditContactPage contact={mockContact} onUpdateContact={mockOnUpdateContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockOnCancelClick).toHaveBeenCalled();
    });

});
