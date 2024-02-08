import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from '../components/MainPage';

const mockContactsList = [
    { firstName: 'Saadman', lastName: 'Rahman', email: 'sdmn@example.com' },
    { firstName: 'Rahman', lastName: 'Saadman', email: 'rhmn@example.com' },
];

const mockOnCreateClick = jest.fn();
const mockOnRemoveClick = jest.fn();
const mockOnEditClick = jest.fn();

describe('MainPage Component', () => {
    it('renders contact list correctly', () => {
        render(<MainPage contactsList={mockContactsList} onCreateClick={mockOnCreateClick} onRemoveClick={mockOnRemoveClick} onEditClick={mockOnEditClick} />);

        mockContactsList.forEach((contact) => {
            const contactText = `${contact.firstName} ${contact.lastName} - ${contact.email}`;
            expect(screen.getByText(contactText)).toBeInTheDocument();
        });
    });

    it('calls the correct function when "Edit" button is clicked', () => {
        render(<MainPage contactsList={mockContactsList} onCreateClick={mockOnCreateClick} onRemoveClick={mockOnRemoveClick} onEditClick={mockOnEditClick} />);

        fireEvent.click(screen.getAllByText('Edit')[0]);

        expect(mockOnEditClick).toHaveBeenCalledWith(0);
    });

    it('calls the correct function when "Remove" button is clicked', () => {
        render(<MainPage contactsList={mockContactsList} onCreateClick={mockOnCreateClick} onRemoveClick={mockOnRemoveClick} onEditClick={mockOnEditClick} />);

        fireEvent.click(screen.getAllByText('Remove')[0]);

        expect(mockOnRemoveClick).toHaveBeenCalledWith(0);
    });

    it('calls the correct function when "Create Contact" button is clicked', () => {
        render(<MainPage contactsList={mockContactsList} onCreateClick={mockOnCreateClick} onRemoveClick={mockOnRemoveClick} onEditClick={mockOnEditClick} />);

        fireEvent.click(screen.getByText('Create Contact'));

        expect(mockOnCreateClick).toHaveBeenCalled();
    });
});
