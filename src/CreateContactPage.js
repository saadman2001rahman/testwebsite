import React, { useState } from 'react';

const CreateContactPage = ({ onAddContact, onCancelClick }) => {
    const [contact, setContact] = useState({
        email: '',
        firstName: '',
        lastName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = () => {
        onAddContact(contact);
        setContact({
            email: '',
            firstName: '',
            lastName: '',
        });
    };

    return (
        <div>
            <h2>Create Contact</h2>
            <form>
                <label>Email:</label>
                <input type="email" name="email" value={contact.email} onChange={handleInputChange} required />

                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={contact.firstName}
                    onChange={handleInputChange}
                    minLength={3}
                    maxLength={25}
                    required
                />

                <label>Last Name (Optional):</label>
                <input
                    type="text"
                    name="lastName"
                    value={contact.lastName}
                    onChange={handleInputChange}
                    minLength={2}
                    maxLength={30}
                />

                <button type="button" onClick={handleSubmit}>
                    Create Contact
                </button>
                <button type="button" onClick={onCancelClick}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreateContactPage;
