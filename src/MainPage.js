import React from 'react';
import './MainPage.css';

const MainPage = ({ contactsList, onCreateClick, onRemoveClick, onEditClick }) => {
    return (
        <div className="main-page">
            <h2>Contact List</h2>
            <ul className="contact-list">
                {contactsList.map((contact, index) => (
                    <li key={index} className="contact-item">
                        <span>{contact.firstName} {contact.lastName} - {contact.email}</span>
                        <button className="edit-btn" onClick={() => onEditClick(index)}>Edit</button>
                        <button className="remove-btn" onClick={() => onRemoveClick(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button className="create-btn" onClick={onCreateClick}>Create Contact</button>
        </div>
    );
};

export default MainPage;
