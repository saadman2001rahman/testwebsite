import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateContactPage from '../components/CreateContactPage';

const mockOnAddContact = jest.fn();
const mockOnCancelClick = jest.fn();

const mockContactsList = [
    { firstName: 'Saadman', lastName: 'Rahman', email: 'sdmn@example.com' },
    { firstName: 'Rahman', lastName: 'Saadman', email: 'rhmn@example.com' },
];


describe('CreateContactPage Component', () => {
    //check if the website renders correctly
    it('renders the form correctly', () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        expect(screen.getByText('Create Contact')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name (Optional):')).toBeInTheDocument();
        expect(screen.getByText('Create Contact')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    //check if website renders inputs
    it('handles input changes correctly', () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name (Optional):'), { target: { value: 'Doe' } });

        expect(screen.getByLabelText('Email:')).toHaveValue('test@example.com');
        expect(screen.getByLabelText('First Name:')).toHaveValue('John');
        expect(screen.getByLabelText('Last Name (Optional):')).toHaveValue('Doe');
    });

    //check if we can create a contact with a valid input (first and last name)
    it('calls onAddContact when "Create Contact" button is clicked with valid input', async () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name (Optional):'), { target: { value: 'Rahm' } });


        fireEvent.click(screen.getByText('Create'));

        await waitFor(() => {
            expect(mockOnAddContact).toHaveBeenCalledWith({
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Rahm',
            });
        });
    });

    //check if we can create a contact with a valid input (first name only)
    it('calls onAddContact when "Create Contact" button is clicked with valid input, no last name entered', async () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });


        fireEvent.click(screen.getByText('Create'));

        await waitFor(() => {
            expect(mockOnAddContact).toHaveBeenCalledWith({
                email: 'test@example.com',
                firstName: 'John',
                lastName: ''
            });
        });
    });

    //check if we can cancel a creation of a contact
    it('calls onCancelClick when "Cancel" button is clicked', () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockOnCancelClick).toHaveBeenCalled();
    });

    //test for input validations

    it('Gives the correct error message when first name is too short', async () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test1@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: '' } });

        fireEvent.click(screen.getByText('Create'));
        await waitFor(() => {
            expect(screen.getByText('First Name too short')).toBeInTheDocument();
        });
    });

    it('Gives the correct error message when first name is too big', async () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test1@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'bbbbbbbbbbbbbbbbbbbbbbbbbb' } });

        fireEvent.click(screen.getByText('Create'));
        await waitFor(() => {
            expect(screen.getByText('First Name too long')).toBeInTheDocument();
        });
    });

    it('Gives the correct error message when last name is too short', async () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test1@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'ssss' } });
        fireEvent.change(screen.getByLabelText('Last Name (Optional):'), { target: { value: 's' } });

        fireEvent.click(screen.getByText('Create'));
        await waitFor(() => {
            expect(screen.getByText('Last name has to be between 2 and 30 characters')).toBeInTheDocument();
        });
    });

    it('Gives the correct error message when last name is too big', async () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test1@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'bbbbbbbbbbbb' } });
        fireEvent.change(screen.getByLabelText('Last Name (Optional):'), { target: { value: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' } });


        fireEvent.click(screen.getByText('Create'));
        await waitFor(() => {
            expect(screen.getByText('Last name has to be between 2 and 30 characters')).toBeInTheDocument();
        });
    });

    it('Gives the correct error message when email is empty', async () => {
        render(<CreateContactPage contactsList={[]} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' } });

        fireEvent.click(screen.getByText('Create'));
        await waitFor(() => {
            expect(screen.getByText('Email cannot be empty')).toBeInTheDocument();
        });
    });


    it('Gives the correct error message when email is not unique', async () => {
        render(<CreateContactPage contactsList={mockContactsList} onAddContact={mockOnAddContact} onCancelClick={mockOnCancelClick} />);

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'sdmn@example.com' } });
        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' } });

        fireEvent.click(screen.getByText('Create'));
        await waitFor(() => {
            expect(screen.getByText('Email must be unique')).toBeInTheDocument();
        });
    });


});
