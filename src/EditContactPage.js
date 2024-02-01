// EditContactPage.js
import React, { useState, useEffect } from 'react';

const EditContactPage = ({ contact, onUpdateContact, onCancelClick }) => {
    const [editedContact, setEditedContact] = useState(contact);

    useEffect(() => {
        setEditedContact(contact);
    }, [contact]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedContact({ ...editedContact, [name]: value });
    };

    const handleSubmit = () => {
        onUpdateContact(editedContact);
    };

    return (
        <div>
            <h2>Edit Contact</h2>
            <form>
                <label>Email:</label>
                <p>{editedContact.email}</p>

                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={editedContact.firstName}
                    onChange={handleInputChange}
                    required
                />

                <label>Last Name (Optional):</label>
                <input
                    type="text"
                    name="lastName"
                    value={editedContact.lastName}
                    onChange={handleInputChange}
                />

                <button type="button" onClick={handleSubmit}>
                    Save Changes
                </button>
                <button type="button" onClick={onCancelClick}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditContactPage;
