import React, { useState, useEffect } from 'react';
import '../styles/CreateContactPage.css';

import { validateValues } from "../utils/validate.js";


const EditContactPage = ({ contact, onUpdateContact, onCancelClick }) => {
    const [editedContact, setEditedContact] = useState({
        email: contact.email,
        firstName: '',
        lastName: '',
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedContact({ ...editedContact, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(editedContact, []));
        setSubmitting(true);
    };

    const finishSubmit = () => {
        console.log(contact);
        onUpdateContact(editedContact);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    }, [errors]);

    return (
        <div className="create-contact-page">
            <h2>Edit Contact</h2>
            <form className="contact-form">
                <label>Email:</label>
                <p>{editedContact.email}</p>

                <label>First Name:</label>
                <input
                    className="form-input"
                    type="text"
                    name="firstName"
                    value={editedContact.firstName}
                    onChange={handleInputChange}
                    style={{ borderColor: errors.firstName ? 'red' : '' }}
                />
                {errors.firstName ? (
                    <p className="error">{errors.firstName}</p>
                ) : null}

                <label>Last Name (Optional):</label>
                <input
                    className="form-input"
                    type="text"
                    name="lastName"
                    value={editedContact.lastName}
                    onChange={handleInputChange}
                    style={{ borderColor: errors.lastName ? 'red' : '' }}
                />
                {errors.lastName ? (
                    <p className="error">{errors.lastName}</p>
                ) : null}


                <button className="submit-btn" type="button" onClick={handleSubmit}>
                    Save Changes
                </button>
                <button className="cancel-btn" type="button" onClick={onCancelClick}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditContactPage;
