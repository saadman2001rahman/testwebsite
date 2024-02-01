import React from 'react';

const MainPage = ({ contactsList, onCreateClick, onRemoveClick, onEditClick }) => {
    return (
        <div>
            <h2>Contact List</h2>
            <ul>
                {contactsList.map((contact, index) => (
                    <li key={index}>
                        {contact.firstName} {contact.lastName} - {contact.email}{' '}
                        <button onClick={() => onEditClick(index)}>Edit</button>
                        <button onClick={() => onRemoveClick(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={onCreateClick}>Create Contact</button>
        </div>
    );
};

export default MainPage;
